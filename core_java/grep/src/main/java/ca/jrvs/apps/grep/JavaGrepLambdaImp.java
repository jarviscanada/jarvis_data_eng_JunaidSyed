package ca.jrvs.apps.grep;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.log4j.BasicConfigurator;

public class JavaGrepLambdaImp extends JavaGrepImp {

  public static void main(String[] args) {
    if (args.length != 3) {
      throw new IllegalArgumentException("USAGE: JavaGrep regex rootPath outFile");
    }

    // User default logger config
    BasicConfigurator.configure();

    //Creating JavaGrepLambdaImp instead of JavaGrepImp
    //We inherit all methods except the override methods
    JavaGrepLambdaImp javaGrepLambdaImp = new JavaGrepLambdaImp();
    javaGrepLambdaImp.setRegex(args[0]);
    javaGrepLambdaImp.setRootPath(args[1]);
    javaGrepLambdaImp.setOutFile(args[2]);
    try {
      javaGrepLambdaImp.process();
    } catch (Exception ex) {
      javaGrepLambdaImp.logger.error(ex.getMessage(), ex);
    }
  }

  @Override
  public void process() throws IOException {
    List<File> files = this.listFiles(this.rootPath);
    List<String> matchedLines = files.stream().map(this::readLines).flatMap(Collection::stream)
        .filter(this::containsPattern).collect(Collectors.toList());
    writeToFile(matchedLines);
  }

  @Override
  public List<File> listFiles(String rootDir) {

    try (Stream<Path> paths = Files.walk(Paths.get(rootDir))) {
      return paths.filter(Files::isRegularFile)
          .map(Path::toFile).collect(Collectors.toList());
    } catch (IOException ex) {
      throw new RuntimeException("Unable to list files", ex);
    }
  }

  @Override
  public List<String> readLines(File inputFile) throws IllegalArgumentException {
    try (Stream<String> lines = Files.lines(inputFile.toPath())) {
      return lines.collect(Collectors.toList());
    } catch (IOException e) {
      throw new RuntimeException("Unable to read file", e);
    }
  }
}