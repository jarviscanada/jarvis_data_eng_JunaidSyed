package ca.jrvs.apps.twitter.dao;

import ca.jrvs.apps.twitter.dao.helper.HttpHelper;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.JsonUtil;
import com.google.gdata.util.common.base.PercentEscaper;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Repository
public class TwitterDao implements CrdDao<Tweet, String> {

  // URI constants
  private static final String API_BASE_URI = "https://api.twitter.com";
  private static final String POST_PATH = "/1.1/statuses/update.json";
  private static final String SHOW_PATH = "/1.1/statuses/show.json";
  private static final String DELETE_PATH = "/1.1/statuses/destroy/";

  // URI symbols
  private static final String QUERY_SYM = "?";
  private static final String AMPERSAND = "&";
  private static final String EQUAL = "=";

  // Response code
  private static final int HTTP_OK = 200;

  private final HttpHelper httpHelper;

  @Autowired
  public TwitterDao(HttpHelper httpHelper) {
    this.httpHelper = httpHelper;
  }

  @Override
  public Tweet create(Tweet tweet) {
    URI uri = getTweetUri(tweet);
    HttpResponse response = this.httpHelper.httpPost(uri);
    return parseResponseBody(response, HTTP_OK);
  }

  @Override
  public Tweet deleteById(String s) {
    // Construct the URI
    URI uri;
    try {
      uri = new URI(API_BASE_URI + DELETE_PATH + "/" + s + ".json");
    } catch (URISyntaxException ex) {
      throw new IllegalArgumentException("Invalid id input", ex);
    }

    // Execute HTTP request
    HttpResponse response = httpHelper.httpPost(uri);

    // Validate response and deserialize to a Tweet object
    return parseResponseBody(response, HTTP_OK);
  }

  @Override
  public Tweet findById(String s) {
    // Construct the URI
    URI uri;
    try {
      uri = new URI(API_BASE_URI + SHOW_PATH + QUERY_SYM + "id" + EQUAL + s);
    } catch (URISyntaxException ex) {
      throw new IllegalArgumentException("Invalid id input", ex);
    }

    // Execute HTTP request
    HttpResponse response = httpHelper.httpGet(uri);

    // Validate response and deserialize to a Tweet object
    return parseResponseBody(response, HTTP_OK);
  }

  private URI getTweetUri(Tweet tweet) {
    URI uri;
    PercentEscaper percentEscaper = new PercentEscaper("", false);
    try {
      uri = new URI(API_BASE_URI + POST_PATH + QUERY_SYM + "status" + EQUAL + percentEscaper
          .escape(tweet.getText()) + AMPERSAND + "long" + EQUAL + tweet.getCoordinates()
          .getCoordinates().get(0) + AMPERSAND + "lat" + EQUAL + tweet.getCoordinates()
          .getCoordinates().get(1));
      return uri;
    } catch (URISyntaxException ex) {
      throw new IllegalArgumentException("Invalid input", ex);
    }
  }

  Tweet parseResponseBody(HttpResponse response, Integer expectedStatusCode) {
    Tweet tweet;

    // Check response status
    int status = response.getStatusLine().getStatusCode();
    if (status != expectedStatusCode) {
      try {
        System.out.println(EntityUtils.toString(response.getEntity()));
      } catch (IOException ex) {
        System.out.println("Response has no entity");
      }
      throw new RuntimeException("Unexpected HTTP status: " + status);
    }

    if (response.getEntity() == null) {
      throw new RuntimeException("Empty response body");
    }

    // Convert response entity to String
    String jsonStr;
    try {
      jsonStr = EntityUtils.toString(response.getEntity());
    } catch (IOException ex) {
      throw new RuntimeException("Failed to convert entity to String", ex);
    }

    // Convert JSON String to Tweet object
    try {
      tweet = JsonUtil.toObjectFromJson(jsonStr, Tweet.class);
    } catch (IOException ex) {
      throw new RuntimeException("Failed to convert JSON string to object", ex);
    }

    return tweet;
  }

}
