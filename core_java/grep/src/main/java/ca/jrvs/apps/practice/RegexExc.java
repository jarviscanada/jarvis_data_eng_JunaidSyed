package ca.jrvs.apps.practice;

public interface RegexExc {

  /**
   * return true if filename extension is jpg or jpeg (case insensitive)
   *
   * @param filename the file name
   * @return true if is a jpg or jpeg file, false otherwise
   */
  boolean matchJpeg(String filename);

  /**
   * return true if ip is valid to simplify the problem, IP address range is from 0.0.0.0 to
   * 999.999.999.999
   *
   * @param ip the IP address
   * @return true if it is a valid IP address, false otherwise
   */
  boolean matchIp(String ip);

  /**
   * return true if line is empty (e.g. empty, white space, tabs, etc.)
   *
   * @param line a string of characters
   * @return true if the line is empty, false otherwise
   */
  boolean isEmptyLine(String line);
}