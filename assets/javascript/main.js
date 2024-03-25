const btn = document.querySelector(".convert");

let outputCode = document.querySelector("#output-code");

let html;
btn.addEventListener("click", (e) => {
  let textArea = document.querySelector("#input-code");
  let regex = /<body[^>]*>([\w|\W]*)<\/body>/im;
  if (regex.test(textArea.value)) {
    working();
  } else {
    console.log("testing");
  }
});

function removeClassList(element) {
  /** Removes all class names from element*/
  element.classList = "";
}

function elementStyles(elementName, selectorType) {
  //   console.log(elementName);

  let a = document.querySelector(
    `#${elementName.nodeName.toLowerCase()}-${selectorType}`
  );

  if (a != null) {
    a = a.value;
    if (+a > 0) {
      const styles = `${selectorType}:${a}px;`;
      elementName.style.cssText += styles;
    }
  }

  //   console.log(elementName);
}

function setColor(externalDocument, idString, type) {
  let color = document.querySelector(`#${idString}`).value;
  let styles = `${type}:${color};`;
  let body = externalDocument;

  body.style.cssText += styles;
  let container = body.querySelector(":first-child");
  container.style.width = "75%";
  container.style.maxWidth = "1500px";
  container.style.margin = "0 auto";
  container.style.border = `2px solid ${color}`;
  container.style.borderRadius = "5px";
  container.style.padding = "16px";

  if (body.contains(body.querySelector("a"))) {
    styles = `color:${color};`;
    let links = body.querySelectorAll("a");
    links.forEach((link) => {
      link.style.cssText += styles;
    });
  }
}

function clearTextAreaInput() {
  let textArea = document.querySelector("#input-code");
  textArea.value = "";
}

function working() {
  let list;
  let textArea = document.querySelector("#input-code");
  textArea = textArea.value;
  const parser = new DOMParser();
  const textAreaDocument = parser.parseFromString(textArea, "text/html").body;
  list = textAreaDocument.querySelectorAll("body > *");

  removeClassList(textAreaDocument);
  list.forEach((htmlElement) => {
    removeClassList(htmlElement);
    if (htmlElement != textAreaDocument.querySelector("div")) {
      htmlElement.remove();
    }
  });

  list = textAreaDocument.querySelectorAll("body > *");
  list = [...list[0].children];

  let uniqueNodes = new Set(
    list.map((node) => {
      return node.nodeName.trim();
    })
  );

  uniqueNodes.forEach((element) => {
    let a = textAreaDocument.querySelectorAll(`${element}`);
    a.forEach((element) => {
      //   element.style.marginTop = "50px";

      elementStyles(element, "margin-top");
      elementStyles(element, "margin-right");
      elementStyles(element, "margin-bottom");
      elementStyles(element, "margin-left");
      elementStyles(element, "padding-top");
      elementStyles(element, "padding-right");
      elementStyles(element, "padding-bottom");
      elementStyles(element, "padding-left");
      elementStyles(element, "font-size");
    });
  });
  setColor(textAreaDocument, "body-background-color", "background-color");
  setColor(textAreaDocument, "font-color", "color");
  html = `<!doctype html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
      <style media="all" type="text/css">
      /* -------------------------------------
      GLOBAL RESETS
  ------------------------------------- */
      
      body {
        font-family: Helvetica, sans-serif;
        
      }
      
      </style>
    </head>
    ${textAreaDocument.outerHTML}
  </html>`;

  outputCode.innerHTML = html;
  clearTextAreaInput();
}
