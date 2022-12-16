package ca.jrvs.apps.practice;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class LambdaStreamExcImp implements LambdaStreamExc{

  @Override
  public Stream<String> createStrStream(String... strings) {
    return Arrays.stream(strings); //same as Stream.of(strings)
  }

  @Override
  public Stream<String> toUpperCase(String... strings) {
    return createStrStream(strings).map(String::toUpperCase);
  }

  @Override
  public Stream<String> filter(Stream<String> stringStream, String pattern) {
    //return stringStream.filter(s -> !s.contains(pattern));
    Pattern regexPattern = Pattern.compile(pattern);

    return stringStream.filter(s -> {
      Matcher matcher = regexPattern.matcher(s);
      return !matcher.find();
    });
  }

  @Override
  public IntStream createIntStream(int[] arr) {
    return Arrays.stream(arr);
  }

  @Override
  public <E> List<E> toList(Stream<E> stream) {
    return stream.collect(Collectors.toList());
  }

  @Override
  public List<Integer> toList(IntStream intStream) {
    return intStream.boxed().collect(Collectors.toList());
  }

  @Override
  public IntStream createIntStream(int start, int end) {
    return IntStream.range(start, end+1);
  }

  @Override
  public DoubleStream squareRootIntStream(IntStream intStream) {
    return intStream.mapToDouble(Math::sqrt);
  }

  @Override
  public IntStream getOdd(IntStream intStream) {
    return intStream.filter(num -> num % 2 == 1);
  }

  @Override
  public Consumer<String> getLambdaPrinter(String prefix, String suffix) {
    return (msg -> System.out.println(prefix + msg + suffix));
  }

  @Override
  public void printMessages(String[] messages, Consumer<String> printer) {
    createStrStream(messages).forEach(printer);
  }

  @Override
  public void printOdd(IntStream intStream, Consumer<String> printer) {
    getOdd(intStream).mapToObj(Integer::toString).forEach(printer);
  }

  @Override
  public Stream<Integer> flatNestedInt(Stream<List<Integer>> ints) {
    // Solution 1: Use reduce to combine all the lists of integers to a single list.
    // Reducing is the process of combining all elements.
    //    return ints.reduce(new ArrayList<Integer>(), (list1, list2) -> {
    //        List<Integer> result = new ArrayList<>(list1);
    //          result.addAll(new ArrayList<Integer>(list2));
    //          return result;
    //      }).stream().map(i -> i * i);

    // Solution 2: Use flatmap to convert each list of integers into one list, then converts
    // into one stream
    return ints.flatMap(Collection::stream).map(i -> i * i);
  }
}
