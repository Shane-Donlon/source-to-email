let btn = document.querySelector(".btn-convert");
let resetLocalStorageBtn = document.querySelector(".btn-reset-local-storage");
let outputCode = document.querySelector("#output-code");

let inputs = document.querySelectorAll("label + *");

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let id = `#${e.target.id}`;
    if (e.target.validity.valid && e.target.value != "") {
      localStorage.setItem("status", "updated");
      localStorage.setItem(id, `${e.target.value}`);
    }
  });
});

let html;
resetLocalStorageBtn.addEventListener("click", (e) => {
  clearLocalStorage();
  location.reload();
});
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

  let bgColor = document.querySelector("#body-background-color").value;
  let color = document.querySelector("#font-color").value;
  let linkcolor = document.querySelector("#a-color").value;
  let title = textAreaDocument.querySelectorAll("h1");
  let font = document.querySelector(`#font-family`);
  //   html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  // <html xmlns="http://www.w3.org/1999/xhtml" lang="en" margin:0;padding:0; background-color:${bgColor}; color:${color}>
  // <head>
  // <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  // <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <title>${title[0].textContent}</title>
  // </head>
  // <body style="margin:0;padding:0; background-color:${bgColor}; color:${color}" >
  // <table role="presentation" class="body" style="background-color:${bgColor}; color:${color};width: 100%;margin:0;padding:0;"> <tr> <td class="center" align="center" valign="top"> <center> <table role="presentation"  class="container" style="width:80%;max-width:600px; margin-left:auto; margin-right:auto;" > <tr> <td class="email-content"></td> </tr> </table> </center> </td> </tr> </table>
  // </body>
  //   </html>`;

  let preheader = document.querySelector("#preheader").textContent;
  html = `<!DOCTYPE html>
  <html
    lang="en"
    xmlns="https://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <title>Codú weekly newsletter</title>
  
      <style media="all" type="text/css">
        /* -------------------------------------
        GLOBAL RESETS
    ------------------------------------- */
  
        body {
       
          -webkit-font-smoothing: antialiased;

          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }
  
        table td {

          vertical-align: top;
        }
        /* -------------------------------------
        BODY & CONTAINER
    ------------------------------------- */
  
        body {
          background-color: :${bgColor};
          color: ${color};
          margin: 0;
          padding: 0;
        }
  
        .body {
          background-color: :${bgColor};
          color: ${color};
          width: 100%;
        }
  
        .container {
          margin: 0 auto !important;
          max-width: 600px;
          padding: 0;
          padding-top: 24px;
          width: 600px;
        }
  
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 600px;
          padding: 0;
        }
        /* -------------------------------------
        HEADER, FOOTER, MAIN
    ------------------------------------- */
  
        
  
        .wrapper {
          box-sizing: border-box;
          padding: 24px;
        }
  
        .footer {
          clear: both;
          padding-top: 24px;
          text-align: center;
          width: 100%;
        }
  
        .footer td,
        .footer p,
        .footer span,
        .footer a {
         
          
          text-align: center;
        }
        /* -------------------------------------
        TYPOGRAPHY
    ------------------------------------- */
  
        a {
         color:${linkcolor};
          text-decoration: underline;
        }
        /* -------------------------------------
        BUTTONS
    ------------------------------------- */
  
        .btn {
          box-sizing: border-box;
          min-width: 100% !important;
          width: 100%;
        }
  
        .btn > tbody > tr > td {
          padding-bottom: 16px;
        }
  
        .btn table {
          width: auto;
        }
  
        .btn table td {
          
          border-radius: 4px;
          text-align: center;
        }
  
        .btn a {
          
         
          border-radius: 4px;
          box-sizing: border-box;
         
          cursor: pointer;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          padding: 12px 24px;
          text-decoration: none;
          text-transform: capitalize;
        }
  
        .btn-primary table td {
          
        }
  
       
  
       
        /* -------------------------------------
        OTHER STYLES THAT MIGHT BE USEFUL
    ------------------------------------- */
  
        .last {
          margin-bottom: 0;
        }
  
        .first {
          margin-top: 0;
        }
  
        .align-center {
          text-align: center;
        }
  
        .align-right {
          text-align: right;
        }
  
        .align-left {
          text-align: left;
        }
  
        .text-link {
     
        }
  
        .clear {
          clear: both;
        }
  
        .mt0 {
          margin-top: 0;
        }
  
        .mb0 {
          margin-bottom: 0;
        }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0;
        }
  
        /* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
  
        @media only screen and (max-width: 640px) {
          .main p,
          .main td,
          .main span {
            font-size: 16px !important;
          }
          .wrapper {
            padding: 8px !important;
          }
          .content {
            padding: 0 !important;
          }
          .container {
            padding: 0 !important;
            padding-top: 8px !important;
            width: 100% !important;
          }
          .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          .btn table {
            max-width: 100% !important;
            width: 100% !important;
          }
          .btn a {
            font-size: 16px !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
        /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
  
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
        }
      </style>
  
      <!--[if mso]>
        <style type="text/css">
          table {
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            margin: 0;
          }
          div,
          td {
            padding: 0;
          }
          div {
            margin: 0 !important;
          }
        </style>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->
    </head>
    <body style="margin:0;padding:0; background-color:${bgColor}; color:${color}" >
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="body"
      >
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader"
                >${preheader}</span
              >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="main"
                style="padding-left: 16px; padding-right:16px padding-top:16px; padding-bottom:16px;"
              >
                <!-- START MAIN CONTENT AREA -->
                <tr>
                
                  <td class="wrapper email-content">
                  <a href="[read_only_href_only]" style="display:block; padding-bottom:16px; color:${linkcolor}; font-family:${font.value}">Read Online</a>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
              </table>
  
              <!-- START FOOTER -->
              <div class="footer">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td class="content-block" style="padding-bottom:16px;">
                      <span class="apple-link"
                        ></span
                      >
                      <br />
                     
                      <p style="color: ${color}; font-family:${font.value};">If you don't want to receive future editions of Codú Weekly</p>
                      <a href="[unsubscribe_url_href_only]" style="display:block; padding-bottom:16px; color:${linkcolor}; font-family:${font.value}">Click here to unsubscribe</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      
                    </td>
                  </tr>
                </table>
              </div>
  
              <!-- END FOOTER -->
  
              <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
  `;
  const finalParser = new DOMParser();
  const email = finalParser.parseFromString(html, "text/html");

  let emailContentArea = email.querySelector(".email-content");

  setFont(textAreaDocument, `font-family:${font.value}; color: ${color};`);

  list = textAreaDocument.querySelectorAll("body > *");
  list = [...list[0].children];
  list.forEach((item) => {
    AddStyling(item);

    setFont(
      textAreaDocument,
      `font-family:${font.value}; color: ${color};`,
      item.nodeName.toLowerCase()
    );
    if (item.hasChildNodes()) {
      let b = [...item.children];
      b.forEach((child) => {
        AddStyling(child);
        setFont(
          textAreaDocument,
          `font-family:${font.value}; color: ${color};`,
          child.nodeName.toLowerCase()
        );
      });
    }
    setLink(
      textAreaDocument,
      `color: ${linkcolor}; text-decoration: underline;`,
      "a"
    );
    emailContentArea.append(item.outerHTML);
  });

  outputCode.innerHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  ${email.documentElement.outerHTML}`;
  clearTextAreaInput();
}

function setLink(documentType, styles, selectorType) {
  /**
   * Applies styles to elements selected by a CSS selector in a given document.
   *
   * This function takes a document, a styles string, and a CSS selector as arguments.
   * It selects all elements in the document that match the selector, and appends the
   * styles string to the existing styles of each selected element and its child nodes.
   *
   * @param {Document} documentType - The document in which to select elements.
   * @param {string} styles - The styles to append to the selected elements.
   * @param {string} selectorType - The CSS selector to use to select elements.
   */
  let body = documentType.querySelectorAll(`${selectorType}`);
  body.forEach((el) => {
    el.style.cssText += styles;
    if (el.hasChildNodes()) {
      documentType.querySelectorAll(`${selectorType} > *`).forEach((node) => {
        node.style.cssText += styles;
      });
    }
  });
}

function setFont(documentType, styles, selectorType) {
  let body = documentType.querySelectorAll(`${selectorType}`);
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
  /**
   * Sets the font styles for a child element.
   *
   * This function takes a parent element and a styles object as arguments.
   * It applies the styles from the styles object to the child elements of the parent.
   *
   * @param {HTMLElement} el - The parent HTML element.
   * @param {Object} styles - The styles to apply to the child elements.
   */
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

function AddStyling(element) {
  let list = [
    `margin-top`,
    `margin-right`,
    `margin-bottom`,
    `margin-left`,
    `padding-top`,
    `padding-right`,
    `padding-bottom`,
    `padding-left`,
    `font-size`,
    `font-weight`,
    `line-height`,
    `color`,
  ];

  let styles;
  list.forEach((listItem) => {
    let b = `#${element.nodeName.toLowerCase()}-${listItem}`;
    if (document.body.contains(document.querySelector(b))) {
      b = document.querySelectorAll(b);
      // is digit is used to determine if it should be px or not
      let isdigit = /\d/gi;
      if (
        isdigit.test(b.value) &&
        listItem != "line-height" &&
        listItem != "font-weight" &&
        listItem != "color"
      ) {
        styles = `${listItem}:${b.value}px;`;
      } else {
        styles = `${listItem}:${b.value};`;
      }
      if (listItem === "color") {
      }
      element.style.cssText += styles;
    }
  });
}

function getFooterLinks() {
  // this will be an input and will append footer links background colour options
}

function LocalStorageSettings(id, value) {
  /**
   * Function to set a value in localStorage.
   *
   * This function takes an id and a value as arguments. It uses the id as the key
   * and the value as the value to set an item in localStorage.
   *
   * @param {string} id - The id to use as the key in localStorage.
   * @param {string} value - The value to set in localStorage.
   */
  id = `${id}`;
  value = `${value}`;
  localStorage.setItem("status", "updated");
  localStorage.setItem(id, `${e.target.value}`);
}

function LocalStorageSettingsSave() {}

window.addEventListener("DOMContentLoaded", (e) => {
  /**
   * Event listener for the DOMContentLoaded event.
   *
   * It iterates over all keys in localStorage. If the value of a key is not "updated" and
   * an element with the key as its selector exists in the document,
   * it sets the value of the input field to the value from localStorage.
   */
  Object.keys(localStorage).forEach((key) => {
    if (localStorage.getItem(key) != "updated") {
      if (document.body.contains(document.querySelector(key))) {
        let input = document.querySelector(key);
        input.value = localStorage.getItem(key);
      }
    }
  });
});

function clearLocalStorage() {
  /**
   * Function to clear all items from this site in localStorage.
   *
   * This function iterates over all keys in localStorage. If the value of a key is "updated"
   * or an element with the key as its selector exists in the document,
   * it removes the key-value pair from localStorage.
   */
  Object.keys(localStorage).forEach((key) => {
    if (
      localStorage.getItem(key) === "updated" ||
      document.body.contains(document.querySelector(key))
    ) {
      localStorage.removeItem(key);
    }
  });
}
