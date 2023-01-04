# Grep Project

### Project Description

Tech Stack: Git, Docker, Java

The grep project is a command line utility that allows the user to search all files recursively in a given directory against the given regex pattern. The application will match all lines from the files with the pattern, then print these lines to an output file as directed by the user. This project is implemented in two different ways using loops and lambdas/streams.

### Quick Start

The application can run from source by providing arguments in the following order:
<regex pattern> <host path to data folder> <host path to log file>
eg. .*Romeo.*Juliet.\* /data /out/javaGrep.out

The application can also be used using docker:

```
docker pull junaidsyedali2000/grep
docker run --rm \
-v <host path to data folder>:<container path to data folder> \
-v <host path to log folder>:<container path to log folder> \
junaidsyedali2000/grep <regex pattern> <host path to data folder> <host path to log file>
```

### Implementation

`JavaGrepImp.java` uses loops to get the files, then goes through each file to get the matched lines.
`JavaGrepLambdaImp.java` uses lambdas and streams to provide a similar output.

```
matchedLines = []
for every file in files found recursively inside directory:
    for every line in file:
        if line matches regex pattern:
            add line to matchedLines
write all lines in matchedLines to output file
```

## Performance Issue

There is a performance issue with the grep approach of using loops. Reading files in this way may cause memory problems with large files. If the file is too large, there may not be enough memory to handle the reading and processing which will cause the program to crash. This is where streams have an advantage in my second grep implementation. Streams are memory efficient since you don't need to load large amounts of data in memory before you are able to process it. Streams make our data composable where each function can be made modular and data is passed to the next function to be worked on.

# Test

The application was tested manually on a sample data file with different sets of test cases. The application output file was compared with my personal results to ensure similar results.

### Deployment

1. Maven Shade Plugin added to the pom.xml to package the program as a Fat Jar
2. Created a DockerFile
3. Created fat jar using mvn clean package
4. Executed docker build -t command to build a docker image using the Dockerfile
5. Deployed image to Docker Hub with docker push command

# Improvements

Performance can be improved with:

1. Creating the application to be multi-threaded by splitting the files across multiple threads
2. Adding additional features/flags to grep command to allow more utility
