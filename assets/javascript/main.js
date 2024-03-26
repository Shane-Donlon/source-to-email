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
  selectorType = selectorType;
  let a = document.querySelector(
    `#${elementName.nodeName.toLowerCase()}-${selectorType}`
  );

  if (a != null) {
    a = a.value;
    if (+a > 0) {
      const styles = `${selectorType}:${a}px;`;
      elementName.style.cssText += styles;
      if (elementName.hasChildNodes()) {
        elementName.childNodes.forEach((element) => {
          if (element.outerHTML != undefined) {
            elementStyles(element, selectorType);
          }
        });
      }
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
  // container.style.width = "75%";
  // container.style.maxWidth = "600";
  // container.style.margin = "0 auto";
  // container.style.border = `2px solid ${color}`;
  // container.style.borderRadius = "5px";
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
    if (htmlElement.nodeName != "DIV") {
      htmlElement.remove();
    }
  });

  // let uniqueNodes = new Set(
  //   list.map((node) => {
  //     return node.nodeName.trim().toLowerCase();
  //   })
  // );

  let bgColor = document.querySelector("#body-background-color").value;
  let color = document.querySelector("#font-color").value;

  let title = textAreaDocument.querySelectorAll("h1");

  html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title[0].textContent}</title>
</head>
<body style="width: 100%;margin:0;padding:0; background-color:${bgColor}; color:${color}" >
<table role="presentation" class="body" style="background-color:${bgColor}; color:${color};width: 100%;margin:0;padding:0;"> <tr> <td class="center" align="center" valign="top"> <center> <table role="presentation"  class="container" style="width:80%;max-width:600px; margin-left:auto; margin-right:auto;" > <tr> <td class="email-content"></td> </tr> </table> </center> </td> </tr> </table>
</body>
  </html>`;

  const finalParser = new DOMParser();
  const email = finalParser.parseFromString(html, "text/html");

  let emailBody = textAreaDocument.querySelectorAll("body > div > *");
  let emailContentArea = email.querySelector(".email-content");
  let font = document.querySelector(`#h1-font-family`);
  let fontColor = document.querySelector(`#font-color`);
  let styles = `font-family:${font.value}; color: ${fontColor.value};`;
  setFont(textAreaDocument, styles);

  list = textAreaDocument.querySelectorAll("body > *");
  list = [...list[0].children];
  list.forEach((item) => {
    AddMarginPadding(item);
    if (item.hasChildNodes()) {
      let b = [...item.children];
      b.forEach((child) => {
        AddMarginPadding(child);
      });
    }

    emailContentArea.append(item.outerHTML);
  });

  outputCode.innerHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  ${email.documentElement.outerHTML}`;
  clearTextAreaInput();
}

function setFont(documentType, styles) {
  let body = documentType.querySelectorAll("body > *");
  body.forEach((el) => {
    el.style.cssText += styles;
    if (el.hasChildNodes()) {
      el.childNodes.forEach((node) => {
        setFontChild(node, styles);
      });
    }
  });
}
function setFontChild(el, styles) {
  el.childNodes.forEach((node) => {
    const nodeHtml = node.outerHTML;
    if (nodeHtml != undefined) {
      node.style.cssText += styles;
      if (node.hasChildNodes()) {
        node.childNodes.forEach((node) => {
          setFontChild(node);
        });
      }
    }
  });
}

function AddMarginPadding(element) {
  let list = [
    `margin-top`,
    `margin-right`,
    `margin-bottom`,
    `margin-left`,
    `padding-top`,
    `padding-right`,
    `padding-bottom`,
    `padding-left`,
    `font-family`,
    `font-size`,
    `font-weight`,
  ];

  let styles;
  list.forEach((listItem) => {
    let b = `#${element.nodeName.toLowerCase()}-${listItem}`;

    if (document.body.contains(document.querySelector(b))) {
      b = document.querySelector(b);

      let isdigit = /\d/gi;
      if (isdigit.test(b.value)) {
        styles = `${listItem}:${b.value}px;`;
      } else {
        styles = `${listItem}:${b.value};`;
      }
      element.style.cssText += styles;
    }
  });
}
