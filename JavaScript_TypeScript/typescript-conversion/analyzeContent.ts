interface Dictionary<T> {
  [key: string]: T;
}

function analyzeHTML(content: string): Dictionary<any> {
  let htmlArray = content.split("<");
  let tags: Dictionary<any> = {};
  htmlArray.splice(0, 1);
  for (let tag of htmlArray) {
    tag = tag.replace(/^\//, "").replace(/>$/, "");
    if (!(tag in tags)) tags[tag] = 0;
    tags[tag]++;
  }
  for (let tag in tags) tags[tag] /= 2;
  return tags;
}

function analyzeCSS(content: string) {
  let cssArray = content.split("}");
  let targets: Dictionary<any> = {};
  cssArray.splice(cssArray.length - 1);
  for (let target of cssArray) {
    target = target.substring(0, target.indexOf("{")).trim();
    if (!(target in targets)) targets[target] = 0;
    targets[target]++;
  }
  return targets;
}

function analyzeText(content: string): number {
  let textArray = content.split("\n");
  return textArray.length;
}

//Assumptions:
//HTML content starts with <html> tag
//CSS content starts with body{}
//Anything else is plain text
function analyzeContent(content: string): Dictionary<any> {
  let output: Dictionary<any> = {};
  content = content.trim();
  if (content.search(/^<html>/) >= 0) {
    output.contentType = "HTML";
    output.tags = analyzeHTML(content);
  } else if (content.search(/^body{/) >= 0) {
    output.contentType = "CSS";
    output.CSSTargets = analyzeCSS(content);
  } else {
    output.contentType = "TEXT";
    output.numberOfLines = analyzeText(content);
  }
  return output;
}

console.log(analyzeContent("<html><div></div><div></div></html>"));
console.log(analyzeContent("body{blabla} a{color:#fff} a{ padding:0}"));
console.log(analyzeContent("\nhello\nworld\n"));
