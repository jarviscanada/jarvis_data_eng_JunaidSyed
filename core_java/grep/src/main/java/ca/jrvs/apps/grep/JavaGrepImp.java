package ca.jrvs.apps.grep;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import org.apache.log4j.BasicConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JavaGrepImp implements JavaGrep {

  final Logger logger = LoggerFactory.getLogger(JavaGrep.class);

  protected String regex;
  protected String rootPath;
  protected String outFile;

  public static void main(String[] args) {
    if (args.length != 3) {
      throw new IllegalArgumentException("USAGE: JavaGrep regex rootPath outFile");
    }

    // User default logger config
    BasicConfigurator.configure();

    JavaGrepImp javaGrepImp = new JavaGrepImp();
    javaGrepImp.setRegex(args[0]);
    javaGrepImp.setRootPath(args[1]);
    javaGrepImp.setOutFile(args[2]);

    try {
      javaGrepImp.process();
    } catch (Exception ex) {
      javaGrepImp.logger.error("Error: Unable to process", ex);
    }
  }

  @Override
  public void process() throws IOException {
    List<String> matchedLines = new ArrayList<>();

    for (File file : this.listFiles(this.rootPath)) {
      for (String line : this.readLines(file)) {
        if (this.containsPattern(line)) {
          matchedLines.add(file.getName() + ": " + line);
        }
      }
    }

    this.writeToFile(matchedLines);
  }

  @Override
  public List<File> listFiles(String rootDir) {
    File rootDirectory = new File(rootDir);
    File[] fileArray = rootDirectory.listFiles();
    if (fileArray == null) {
      fileArray = new File[]{};
    }
    List<File> fileList = new ArrayList<>(Arrays.asList(fileArray));

    List<File> childrenFileList = new ArrayList<>();
    for (int i = 0; i < fileList.size(); i++) {
      File currFile = fileList.get(i);
      if (currFile.isDirectory()) {
        fileList.remove(i);
        i--;
        childrenFileList.addAll(this.listFiles(currFile.getAbsolutePath()));
      }
    }
    fileList.addAll(childrenFileList);

    return fileList;
  }

  @Override
  public List<String> readLines(File inputFile) {
    List<String> lines = new ArrayList<>();

    try {
      BufferedReader reader = new BufferedReader(new FileReader(inputFile));
      String currLine = reader.readLine();
      while (currLine != null) {
        lines.add(currLine);
        currLine = reader.readLine();
      }
      reader.close();

      return lines;

    } catch (FileNotFoundException ex) {
      throw new IllegalArgumentException("Given file does not exist", ex);
    } catch (IOException ex) {
      throw new IllegalArgumentException("Given file cannot be read", ex);
    }
  }

  @Override
  public boolean containsPattern(String line) {
    return Pattern.compile(this.regex).matcher(line).find();
  }

  @Override
  public void writeToFile(List<String> lines) throws IOException {
    BufferedWriter writer = new BufferedWriter(new FileWriter(this.outFile));

    for (String line : lines) {
      writer.write(line + "\n");
    }
    writer.close();
  }

  @Override
  public String getRootPath() {
    return this.rootPath;
  }

  @Override
  public void setRootPath(String rootPath) {
    this.rootPath = rootPath;
  }

  @Override
  public String getRegex() {
    return this.regex;
  }

  @Override
  public void setRegex(String regex) {
    this.regex = regex;
  }

  @Override
  public String getOutFile() {
    return this.outFile;
  }

  @Override
  public void setOutFile(String outFile) {
    this.outFile = outFile;
  }
}
