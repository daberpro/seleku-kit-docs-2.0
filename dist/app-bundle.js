(() => {
  // node_modules/marked/lib/marked.esm.js
  function getDefaults() {
    return {
      baseUrl: null,
      breaks: false,
      extensions: null,
      gfm: true,
      headerIds: true,
      headerPrefix: "",
      highlight: null,
      langPrefix: "language-",
      mangle: true,
      pedantic: false,
      renderer: null,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      walkTokens: null,
      xhtml: false
    };
  }
  var defaults = getDefaults();
  function changeDefaults(newDefaults) {
    defaults = newDefaults;
  }
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html;
  }
  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
  function unescape(html) {
    return html.replace(unescapeTest, (_, n) => {
      n = n.toLowerCase();
      if (n === "colon")
        return ":";
      if (n.charAt(0) === "#") {
        return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return "";
    });
  }
  var caret = /(^|[^\[])\^/g;
  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || "";
    const obj = {
      replace: (name, val) => {
        val = val.source || val;
        val = val.replace(caret, "$1");
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: () => {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }
  var nonWordAndColonTest = /[^\w:]/g;
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      let prot;
      try {
        prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
      } catch (e) {
        return null;
      }
      if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
        return null;
      }
    }
    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return href;
  }
  var baseUrls = {};
  var justDomain = /^[^:]+:\/*[^/]*$/;
  var protocol = /^([^:]+:)[\s\S]*$/;
  var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  function resolveUrl(base, href) {
    if (!baseUrls[" " + base]) {
      if (justDomain.test(base)) {
        baseUrls[" " + base] = base + "/";
      } else {
        baseUrls[" " + base] = rtrim(base, "/", true);
      }
    }
    base = baseUrls[" " + base];
    const relativeBase = base.indexOf(":") === -1;
    if (href.substring(0, 2) === "//") {
      if (relativeBase) {
        return href;
      }
      return base.replace(protocol, "$1") + href;
    } else if (href.charAt(0) === "/") {
      if (relativeBase) {
        return href;
      }
      return base.replace(domain, "$1") + href;
    } else {
      return base + href;
    }
  }
  var noopTest = { exec: function noopTest2() {
  } };
  function merge(obj) {
    let i = 1, target, key;
    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
    return obj;
  }
  function splitCells(tableRow, count) {
    const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false, curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(/ \|/);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
      cells.pop();
    }
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.substr(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    const l = str.length;
    let level = 0, i = 0;
    for (; i < l; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
    }
  }
  function repeatString(pattern, count) {
    if (count < 1) {
      return "";
    }
    let result = "";
    while (count > 1) {
      if (count & 1) {
        result += pattern;
      }
      count >>= 1;
      pattern += pattern;
    }
    return result + pattern;
  }
  function outputLink(cap, link, raw, lexer2) {
    const href = link.href;
    const title = link.title ? escape(link.title) : null;
    const text2 = cap[1].replace(/\\([\[\]])/g, "$1");
    if (cap[0].charAt(0) !== "!") {
      lexer2.state.inLink = true;
      const token = {
        type: "link",
        raw,
        href,
        title,
        text: text2,
        tokens: lexer2.inlineTokens(text2, [])
      };
      lexer2.state.inLink = false;
      return token;
    } else {
      return {
        type: "image",
        raw,
        href,
        title,
        text: escape(text2)
      };
    }
  }
  function indentCodeCompensation(raw, text2) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
      return text2;
    }
    const indentToCode = matchIndentToCode[1];
    return text2.split("\n").map((node) => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var Tokenizer = class {
    constructor(options2) {
      this.options = options2 || defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text2 = cap[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text2, "\n") : text2
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text2 = indentCodeCompensation(raw, cap[3] || "");
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: text2
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text2 = cap[2].trim();
        if (/#$/.test(text2)) {
          const trimmed = rtrim(text2, "#");
          if (this.options.pedantic) {
            text2 = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            text2 = trimmed.trim();
          }
        }
        const token = {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text: text2,
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: cap[0]
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        const text2 = cap[0].replace(/^ *> ?/gm, "");
        return {
          type: "blockquote",
          raw: cap[0],
          tokens: this.lexer.blockTokens(text2, []),
          text: text2
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*)?(?:\\n|$))`);
        while (src) {
          endEarly = false;
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          line = cap[2].split("\n", 1)[0];
          nextLine = src.split("\n", 1)[0];
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimLeft();
          } else {
            indent = cap[2].search(/[^ ]/);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          blankLine = false;
          if (!line && /^ *$/.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);
            while (src) {
              rawLine = src.split("\n", 1)[0];
              line = rawLine;
              if (this.options.pedantic) {
                line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
              }
              if (nextBulletRegex.test(line)) {
                break;
              }
              if (line.search(/[^ ]/) >= indent || !line.trim()) {
                itemContents += "\n" + line.slice(indent);
              } else if (!blankLine) {
                itemContents += "\n" + line;
              } else {
                break;
              }
              if (!blankLine && !line.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
            }
          }
          if (!list.loose) {
            if (endsWithBlankLine) {
              list.loose = true;
            } else if (/\n *\n *$/.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          if (this.options.gfm) {
            istask = /^\[[ xX]\] /.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
            }
          }
          list.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents
          });
          list.raw += raw;
        }
        list.items[list.items.length - 1].raw = raw.trimRight();
        list.items[list.items.length - 1].text = itemContents.trimRight();
        list.raw = list.raw.trimRight();
        const l = list.items.length;
        for (i = 0; i < l; i++) {
          this.lexer.state.top = false;
          list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
          const spacers = list.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.every((t) => {
            const chars = t.raw.split("");
            let lineBreaks = 0;
            for (const char of chars) {
              if (char === "\n") {
                lineBreaks += 1;
              }
              if (lineBreaks > 1) {
                return true;
              }
            }
            return false;
          });
          if (!list.loose && spacers.length && hasMultipleLineBreaks) {
            list.loose = true;
            list.items[i].loose = true;
          }
        }
        return list;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
          text: cap[0]
        };
        if (this.options.sanitize) {
          token.type = "paragraph";
          token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
          token.tokens = [];
          this.lexer.inline(token.text, token.tokens);
        }
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        if (cap[3])
          cap[3] = cap[3].substring(1, cap[3].length - 1);
        const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
        return {
          type: "def",
          tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (cap) {
        const item = {
          type: "table",
          header: splitCells(cap[1]).map((c) => {
            return { text: c };
          }),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          let l = item.align.length;
          let i, j, k, row;
          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
          l = item.rows.length;
          for (i = 0; i < l; i++) {
            item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
              return { text: c };
            });
          }
          l = item.header.length;
          for (j = 0; j < l; j++) {
            item.header[j].tokens = [];
            this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
          }
          l = item.rows.length;
          for (j = 0; j < l; j++) {
            row = item.rows[j];
            for (k = 0; k < row.length; k++) {
              row[k].tokens = [];
              this.lexer.inlineTokens(row[k].text, row[k].tokens);
            }
          }
          return item;
        }
      }
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        const token = {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const token = {
          type: "paragraph",
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        const token = {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: escape(cap[1])
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: this.options.sanitize ? "text" : "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && /^</.test(trimmedUrl)) {
          if (!/>$/.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link) {
            href = link[1];
            title = link[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (/^</.test(href)) {
          if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
          title: title ? title.replace(this.rules.inline._escapes, "$1") : title
        }, cap[0], this.lexer);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
        link = links[link.toLowerCase()];
        if (!link || !link.href) {
          const text2 = cap[0].charAt(0);
          return {
            type: "text",
            raw: text2,
            text: text2
          };
        }
        return outputLink(cap, link, cap[0], this.lexer);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrong.lDelim.exec(src);
      if (!match)
        return;
      if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
        return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
        const lLength = match[0].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim)
            continue;
          rLength = rDelim.length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0)
            continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          if (Math.min(lLength, rLength) % 2) {
            const text3 = src.slice(1, lLength + match.index + rLength);
            return {
              type: "em",
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text: text3,
              tokens: this.lexer.inlineTokens(text3, [])
            };
          }
          const text2 = src.slice(2, lLength + match.index + rLength - 1);
          return {
            type: "strong",
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2, [])
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text2 = cap[2].replace(/\n/g, " ");
        const hasNonSpaceChars = /[^ ]/.test(text2);
        const hasSpaceCharsOnBothEnds = /^ /.test(text2) && / $/.test(text2);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text2 = text2.substring(1, text2.length - 1);
        }
        text2 = escape(text2, true);
        return {
          type: "codespan",
          raw: cap[0],
          text: text2
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2], [])
        };
      }
    }
    autolink(src, mangle2) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text2, href;
        if (cap[2] === "@") {
          text2 = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
          href = "mailto:" + text2;
        } else {
          text2 = escape(cap[1]);
          href = text2;
        }
        return {
          type: "link",
          raw: cap[0],
          text: text2,
          href,
          tokens: [
            {
              type: "text",
              raw: text2,
              text: text2
            }
          ]
        };
      }
    }
    url(src, mangle2) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text2, href;
        if (cap[2] === "@") {
          text2 = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
          href = "mailto:" + text2;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text2 = escape(cap[0]);
          if (cap[1] === "www.") {
            href = "http://" + text2;
          } else {
            href = text2;
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text: text2,
          href,
          tokens: [
            {
              type: "text",
              raw: text2,
              text: text2
            }
          ]
        };
      }
    }
    inlineText(src, smartypants2) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        let text2;
        if (this.lexer.state.inRawBlock) {
          text2 = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        } else {
          text2 = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
        }
        return {
          type: "text",
          raw: cap[0],
          text: text2
        };
      }
    }
  };
  var block = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: noopTest,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
  block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
  block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
  block.normal = merge({}, block);
  block.gfm = merge({}, block.normal, {
    table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  });
  block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.pedantic = merge({}, block.normal, {
    html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  });
  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
      lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
      rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
      rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/
  };
  inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
  inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
  inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
  inline.escapedEmSt = /\\\*|\\_/g;
  inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
  inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
  inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
  inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
  inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
  inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
  inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
  inline.normal = merge({}, inline);
  inline.pedantic = merge({}, inline.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
  });
  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  });
  inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace("{2,}", "*").getRegex(),
    text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  });
  function smartypants(text2) {
    return text2.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
  }
  function mangle(text2) {
    let out = "", i, ch;
    const l = text2.length;
    for (i = 0; i < l; i++) {
      ch = text2.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = "x" + ch.toString(16);
      }
      out += "&#" + ch + ";";
    }
    return out;
  }
  var Lexer = class {
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || defaults;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    static get rules() {
      return {
        block,
        inline
      };
    }
    static lex(src, options2) {
      const lexer2 = new Lexer(options2);
      return lexer2.lex(src);
    }
    static lexInline(src, options2) {
      const lexer2 = new Lexer(options2);
      return lexer2.inlineTokens(src);
    }
    lex(src) {
      src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
      this.blockTokens(src, this.tokens);
      let next;
      while (next = this.inlineQueue.shift()) {
        this.inlineTokens(next.src, next.tokens);
      }
      return this.tokens;
    }
    blockTokens(src, tokens = []) {
      if (this.options.pedantic) {
        src = src.replace(/^ +$/gm, "");
      }
      let token, lastToken, cutSrc, lastParagraphClipped;
      while (src) {
        if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          if (token.raw.length === 1 && tokens.length > 0) {
            tokens[tokens.length - 1].raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        cutSrc = src;
        if (this.options.extensions && this.options.extensions.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach(function(getStartIndex) {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          lastToken = tokens[tokens.length - 1];
          if (lastParagraphClipped && lastToken.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens) {
      this.inlineQueue.push({ src, tokens });
    }
    inlineTokens(src, tokens = []) {
      let token, lastToken, cutSrc;
      let maskedSrc = src;
      let match;
      let keepPrevChar, prevChar;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      }
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === "text" && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === "text" && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        cutSrc = src;
        if (this.options.extensions && this.options.extensions.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach(function(getStartIndex) {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var Renderer = class {
    constructor(options2) {
      this.options = options2 || defaults;
    }
    code(code, infostring, escaped) {
      const lang = (infostring || "").match(/\S*/)[0];
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }
      code = code.replace(/\n$/, "") + "\n";
      if (!lang) {
        return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    blockquote(quote) {
      return "<blockquote>\n" + quote + "</blockquote>\n";
    }
    html(html) {
      return html;
    }
    heading(text2, level, raw, slugger) {
      if (this.options.headerIds) {
        return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text2 + "</h" + level + ">\n";
      }
      return "<h" + level + ">" + text2 + "</h" + level + ">\n";
    }
    hr() {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }
    list(body, ordered, start) {
      const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
    }
    listitem(text2) {
      return "<li>" + text2 + "</li>\n";
    }
    checkbox(checked) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
    }
    paragraph(text2) {
      return "<p>" + text2 + "</p>\n";
    }
    table(header, body) {
      if (body)
        body = "<tbody>" + body + "</tbody>";
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow(content) {
      return "<tr>\n" + content + "</tr>\n";
    }
    tablecell(content, flags) {
      const type = flags.header ? "th" : "td";
      const tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
      return tag + content + "</" + type + ">\n";
    }
    strong(text2) {
      return "<strong>" + text2 + "</strong>";
    }
    em(text2) {
      return "<em>" + text2 + "</em>";
    }
    codespan(text2) {
      return "<code>" + text2 + "</code>";
    }
    br() {
      return this.options.xhtml ? "<br/>" : "<br>";
    }
    del(text2) {
      return "<del>" + text2 + "</del>";
    }
    link(href, title, text2) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text2;
      }
      let out = '<a href="' + escape(href) + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ">" + text2 + "</a>";
      return out;
    }
    image(href, title, text2) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text2;
      }
      let out = '<img src="' + href + '" alt="' + text2 + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? "/>" : ">";
      return out;
    }
    text(text2) {
      return text2;
    }
  };
  var TextRenderer = class {
    strong(text2) {
      return text2;
    }
    em(text2) {
      return text2;
    }
    codespan(text2) {
      return text2;
    }
    del(text2) {
      return text2;
    }
    html(text2) {
      return text2;
    }
    text(text2) {
      return text2;
    }
    link(href, title, text2) {
      return "" + text2;
    }
    image(href, title, text2) {
      return "" + text2;
    }
    br() {
      return "";
    }
  };
  var Slugger = class {
    constructor() {
      this.seen = {};
    }
    serialize(value) {
      return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
    }
    getNextSafeSlug(originalSlug, isDryRun) {
      let slug = originalSlug;
      let occurenceAccumulator = 0;
      if (this.seen.hasOwnProperty(slug)) {
        occurenceAccumulator = this.seen[originalSlug];
        do {
          occurenceAccumulator++;
          slug = originalSlug + "-" + occurenceAccumulator;
        } while (this.seen.hasOwnProperty(slug));
      }
      if (!isDryRun) {
        this.seen[originalSlug] = occurenceAccumulator;
        this.seen[slug] = 0;
      }
      return slug;
    }
    slug(value, options2 = {}) {
      const slug = this.serialize(value);
      return this.getNextSafeSlug(slug, options2.dryrun);
    }
  };
  var Parser = class {
    constructor(options2) {
      this.options = options2 || defaults;
      this.options.renderer = this.options.renderer || new Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer();
      this.slugger = new Slugger();
    }
    static parse(tokens, options2) {
      const parser2 = new Parser(options2);
      return parser2.parse(tokens);
    }
    static parseInline(tokens, options2) {
      const parser2 = new Parser(options2);
      return parser2.parseInline(tokens);
    }
    parse(tokens, top = true) {
      let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
      const l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
            out += ret || "";
            continue;
          }
        }
        switch (token.type) {
          case "space": {
            continue;
          }
          case "hr": {
            out += this.renderer.hr();
            continue;
          }
          case "heading": {
            out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
            continue;
          }
          case "code": {
            out += this.renderer.code(token.text, token.lang, token.escaped);
            continue;
          }
          case "table": {
            header = "";
            cell = "";
            l2 = token.header.length;
            for (j = 0; j < l2; j++) {
              cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
            }
            header += this.renderer.tablerow(cell);
            body = "";
            l2 = token.rows.length;
            for (j = 0; j < l2; j++) {
              row = token.rows[j];
              cell = "";
              l3 = row.length;
              for (k = 0; k < l3; k++) {
                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
              }
              body += this.renderer.tablerow(cell);
            }
            out += this.renderer.table(header, body);
            continue;
          }
          case "blockquote": {
            body = this.parse(token.tokens);
            out += this.renderer.blockquote(body);
            continue;
          }
          case "list": {
            ordered = token.ordered;
            start = token.start;
            loose = token.loose;
            l2 = token.items.length;
            body = "";
            for (j = 0; j < l2; j++) {
              item = token.items[j];
              checked = item.checked;
              task = item.task;
              itemBody = "";
              if (item.task) {
                checkbox = this.renderer.checkbox(checked);
                if (loose) {
                  if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                    item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                      item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                    }
                  } else {
                    item.tokens.unshift({
                      type: "text",
                      text: checkbox
                    });
                  }
                } else {
                  itemBody += checkbox;
                }
              }
              itemBody += this.parse(item.tokens, loose);
              body += this.renderer.listitem(itemBody, task, checked);
            }
            out += this.renderer.list(body, ordered, start);
            continue;
          }
          case "html": {
            out += this.renderer.html(token.text);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(this.parseInline(token.tokens));
            continue;
          }
          case "text": {
            body = token.tokens ? this.parseInline(token.tokens) : token.text;
            while (i + 1 < l && tokens[i + 1].type === "text") {
              token = tokens[++i];
              body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
            }
            out += top ? this.renderer.paragraph(body) : body;
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return;
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      let out = "", i, token, ret;
      const l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
            out += ret || "";
            continue;
          }
        }
        switch (token.type) {
          case "escape": {
            out += renderer.text(token.text);
            break;
          }
          case "html": {
            out += renderer.html(token.text);
            break;
          }
          case "link": {
            out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
            break;
          }
          case "image": {
            out += renderer.image(token.href, token.title, token.text);
            break;
          }
          case "strong": {
            out += renderer.strong(this.parseInline(token.tokens, renderer));
            break;
          }
          case "em": {
            out += renderer.em(this.parseInline(token.tokens, renderer));
            break;
          }
          case "codespan": {
            out += renderer.codespan(token.text);
            break;
          }
          case "br": {
            out += renderer.br();
            break;
          }
          case "del": {
            out += renderer.del(this.parseInline(token.tokens, renderer));
            break;
          }
          case "text": {
            out += renderer.text(token.text);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return;
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  function marked(src, opt, callback) {
    if (typeof src === "undefined" || src === null) {
      throw new Error("marked(): input parameter is undefined or null");
    }
    if (typeof src !== "string") {
      throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
    }
    if (typeof opt === "function") {
      callback = opt;
      opt = null;
    }
    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);
    if (callback) {
      const highlight = opt.highlight;
      let tokens;
      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }
      const done = function(err) {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = Parser.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
        }
        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    try {
      const tokens = Lexer.lex(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      return Parser.parse(tokens, opt);
    } catch (e) {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (opt.silent) {
        return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      }
      throw e;
    }
  }
  marked.options = marked.setOptions = function(opt) {
    merge(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = getDefaults;
  marked.defaults = defaults;
  marked.use = function(...args) {
    const opts = merge({}, ...args);
    const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
    let hasExtensions;
    args.forEach((pack) => {
      if (pack.extensions) {
        hasExtensions = true;
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if (ext.renderer) {
            const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if (ext.tokenizer) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            if (extensions[ext.level]) {
              extensions[ext.level].unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if (ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
      }
      if (pack.renderer) {
        const renderer = marked.defaults.renderer || new Renderer();
        for (const prop in pack.renderer) {
          const prevRenderer = renderer[prop];
          renderer[prop] = (...args2) => {
            let ret = pack.renderer[prop].apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret;
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = marked.defaults.tokenizer || new Tokenizer();
        for (const prop in pack.tokenizer) {
          const prevTokenizer = tokenizer[prop];
          tokenizer[prop] = (...args2) => {
            let ret = pack.tokenizer[prop].apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.walkTokens) {
        const walkTokens2 = marked.defaults.walkTokens;
        opts.walkTokens = function(token) {
          pack.walkTokens.call(this, token);
          if (walkTokens2) {
            walkTokens2.call(this, token);
          }
        };
      }
      if (hasExtensions) {
        opts.extensions = extensions;
      }
      marked.setOptions(opts);
    });
  };
  marked.walkTokens = function(tokens, callback) {
    for (const token of tokens) {
      callback.call(marked, token);
      switch (token.type) {
        case "table": {
          for (const cell of token.header) {
            marked.walkTokens(cell.tokens, callback);
          }
          for (const row of token.rows) {
            for (const cell of row) {
              marked.walkTokens(cell.tokens, callback);
            }
          }
          break;
        }
        case "list": {
          marked.walkTokens(token.items, callback);
          break;
        }
        default: {
          if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
            marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
              marked.walkTokens(token[childTokens], callback);
            });
          } else if (token.tokens) {
            marked.walkTokens(token.tokens, callback);
          }
        }
      }
    }
  };
  marked.parseInline = function(src, opt) {
    if (typeof src === "undefined" || src === null) {
      throw new Error("marked.parseInline(): input parameter is undefined or null");
    }
    if (typeof src !== "string") {
      throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
    }
    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);
    try {
      const tokens = Lexer.lexInline(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      return Parser.parseInline(tokens, opt);
    } catch (e) {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (opt.silent) {
        return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      }
      throw e;
    }
  };
  marked.Parser = Parser;
  marked.parser = Parser.parse;
  marked.Renderer = Renderer;
  marked.TextRenderer = TextRenderer;
  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;
  marked.Tokenizer = Tokenizer;
  marked.Slugger = Slugger;
  marked.parse = marked;
  var options = marked.options;
  var setOptions = marked.setOptions;
  var use = marked.use;
  var walkTokens = marked.walkTokens;
  var parseInline = marked.parseInline;
  var parser = Parser.parse;
  var lexer = Lexer.lex;

  // node_modules/dabcom/res/Reactivity.js
  var Reactivity = class {
    #onGet = null;
    #onSet = null;
    constructor(config) {
      this.#onGet = config.Getter;
      this.#onSet = config.Setter;
    }
    setReactive(Obj) {
      if (typeof this.#onGet !== "function") {
        this.#onGet = () => {
        };
      }
      if (typeof this.#onSet !== "function") {
        this.#onGet = () => {
        };
      }
      const onGet = this.#onGet;
      const onSet = this.#onSet;
      const obj = new Proxy(Obj, {
        get(object, propertyName) {
          return onGet(object, propertyName) || object[propertyName];
        },
        set(object, propertyName, valueSet) {
          if (typeof valueSet === "function") {
            Obj[propertyName] = valueSet(object, propertyName, valueSet) || null;
          } else {
            Obj[propertyName] = valueSet;
          }
          onSet(object, propertyName, valueSet);
          return 1;
        }
      });
      return obj;
    }
  };

  // node_modules/dabcom/res/dabMainClass.js
  var Main = class {
    #allComponentId = {};
    #kindOfComponentBindingData = {};
    createRawComponent(name, attribute) {
      return {
        name,
        content: attribute?.content,
        attribute: attribute?.attribute,
        parentComponent: attribute?.parentComponent,
        positionComponent: attribute?.positionComponent,
        state: attribute?.state || {},
        event: attribute?.event || {},
        id: attribute?.id
      };
    }
    createComponent(rawComponent, embedData = {}) {
      const element = document.createElement(rawComponent.name);
      if (rawComponent?.attribute instanceof Object) {
        for (let x in rawComponent?.attribute) {
          element.setAttribute(x, rawComponent?.attribute[x]);
        }
      }
      const textNode = document.createTextNode(rawComponent?.content);
      element.appendChild(textNode);
      return {
        element,
        content: textNode,
        rawContent: rawComponent?.content,
        parent: rawComponent.parentComponent,
        position: rawComponent.positionComponent,
        state: rawComponent?.state,
        event: rawComponent?.event,
        ...embedData,
        destroy(onDestroy = () => {
        }) {
          onDestroy();
          element.remove();
        },
        updateTextNode() {
          const text = this.rawContent;
          const resultText = eval(text);
          this.content.replaceData(0, text.length, resultText);
        },
        updateAttribute() {
        }
      };
    }
    renderComponent(StackRawComponent, target, embedData2 = {}) {
      const StackComponent = [];
      let State = {};
      const kindOfComponentBindingData = this.#kindOfComponentBindingData;
      for (let x of StackRawComponent) {
        const componentCreated = this.createComponent(x, embedData2);
        State = { ...State, ...componentCreated.state };
        if (x?.id) {
          this.#allComponentId[x?.id] = {
            ...componentCreated,
            state: new Reactivity({
              Getter(object, propertyName) {
                return object[propertyName];
              },
              Setter(object, propertyName, valueSet) {
                for (let x2 of kindOfComponentBindingData[propertyName]) {
                  x2.state[propertyName] = valueSet;
                  x2.updateTextNode();
                }
              }
            }).setReactive(State)
          };
        }
        if (x?.event instanceof Object) {
          for (let y in x?.event) {
            componentCreated.element[y] = () => x?.event[y]({
              state: new Reactivity({
                Getter(object, propertyName) {
                  return object[propertyName];
                },
                Setter(object, propertyName, valueSet) {
                  for (let x2 of kindOfComponentBindingData[propertyName]) {
                    x2.state[propertyName] = valueSet;
                    x2.updateTextNode();
                  }
                }
              }).setReactive(State)
            });
          }
        }
        for (let y of Object.keys(componentCreated.state)) {
          if (kindOfComponentBindingData[y] instanceof Array) {
            kindOfComponentBindingData[y].push(componentCreated);
          } else {
            kindOfComponentBindingData[y] = [];
            kindOfComponentBindingData[y].push(componentCreated);
          }
        }
        ;
        StackComponent.push(componentCreated);
      }
      const element2 = {};
      for (let x of StackComponent) {
        x.updateTextNode();
        if (!element2[x.position]) {
          element2[x.position] = x.element;
          if (element2[x.parent]) {
            element2[x.parent].appendChild(x.element);
          }
        } else {
          element2[x.position].appendChild(x.element);
        }
      }
      if (target instanceof HTMLElement)
        target.appendChild(element2[Object.keys(element2)[0]]);
      return {
        destroy: StackComponent[0].destroy,
        component: StackComponent[0],
        state: new Reactivity({
          Getter(object, propertyName) {
            return object[propertyName];
          },
          Setter(object, propertyName, valueSet) {
            for (let x of kindOfComponentBindingData[propertyName]) {
              x.state[propertyName] = valueSet;
              x.updateTextNode();
            }
          }
        }).setReactive(State),
        updateComponentRendered() {
          for (let x of StackComponent) {
            x.updateTextNode();
          }
        }
      };
    }
    replaceChild(newComponent, oldComponent) {
      oldComponent.parentElement.replaceChild(newComponent.element, oldComponent);
    }
    findById(id) {
      return this.#allComponentId[id];
    }
  };

  // node_modules/dabcom/res/dabMain.js
  var dabMain = new Main();
  function findById(id) {
    return dabMain.findById(id);
  }
  function Render(Component, target, embedData2) {
    return {
      ...dabMain.renderComponent(Component, target, embedData2),
      updateComponentProperty(componentFunction, property) {
        const newComponent = dabMain.renderComponent(componentFunction(property), void 0, embedData2);
        dabMain.replaceChild(newComponent.component, this.component.element);
      }
    };
  }

  // node_modules/dabcom/spa/route.js
  var SPA = class {
    #router = [];
    #previousComponentRendered = null;
    constructor() {
      window.addEventListener("DOMContentLoaded", () => {
        document.body.onclick = (e) => {
          if (e.target.matches("[data-link]")) {
            e.preventDefault();
            this.navigateTo(e.target.href);
          }
        };
      });
      window.onpopstate = () => {
        this.render();
      };
    }
    navigateTo(url) {
      history.pushState(null, null, url);
      this.render();
    }
    addNewRouter(path, handler) {
      this.#router.push({
        path,
        event: handler,
        isMatch: false
      });
    }
    matchRoute(path) {
      return location.pathname === path;
    }
    updateRouteHandler() {
      const match = this.matchRoute;
      this.#router = this.#router.map((e) => ({
        path: e.path,
        event: e.event,
        isMatch: match(e.path)
      }));
    }
    render() {
      this.updateRouteHandler();
      let routeHandler = this.#router.find((e) => e.isMatch);
      if (!routeHandler) {
        routeHandler = {
          path: location.pathname,
          event: () => {
            console.log("page not found");
          },
          isMatch: true
        };
      }
      if (this.#previousComponentRendered instanceof Object) {
        this.#previousComponentRendered.destroy();
        this.#previousComponentRendered = routeHandler.event();
      } else {
        this.#previousComponentRendered = routeHandler.event();
      }
    }
    routeTo(path, handler) {
      this.addNewRouter(path, handler);
    }
  };
  var Router = {
    SPA: new SPA(),
    route({ path, component, data = {}, target = () => {
    }, onrender = () => {
    } }) {
      this.SPA.routeTo(path, () => {
        const Component = Render(component, target(), data);
        onrender(Component);
        return Component;
      });
      this.SPA.render();
    }
  };

  // node_modules/seleku-kit-material-component/component/DCard.selek
  function DCard({
    parentcomponent,
    positioncomponent,
    $class,
    $id = 0
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "``",
      parentComponent: parentcomponent,
      positionComponent: positioncomponent,
      state: {},
      event: {},
      attribute: {
        "class": $class + " smc-card"
      },
      id: ""
    })];
  }

  // node_modules/seleku-kit-material-component/component/DChips.selek
  function DChips({
    parentcomponent,
    positioncomponent,
    $class,
    $id = 0
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "`                            `",
      parentComponent: parentcomponent,
      positionComponent: positioncomponent,
      state: {},
      event: {},
      attribute: {
        "class": $class + " smc-chips smc-ripple"
      },
      id: ""
    }), dabMain.createRawComponent(`div`, {
      content: "``",
      parentComponent: positioncomponent,
      positionComponent: "16136011000240108000287160910020" + $id,
      state: {},
      event: {},
      attribute: {
        "class": "ripple"
      },
      id: ""
    })];
  }

  // node_modules/seleku-kit-material-component/component/init.js
  function setRipple() {
    try {
      const letters = Array.from(document.querySelectorAll(".smc-ripple"));
      letters.forEach((letter) => {
        let timerId;
        letter.addEventListener("mousedown", (e) => {
          clearTimeout(timerId);
          const ripple = letter.querySelector(".ripple");
          const size = letter.offsetWidth;
          const pos = letter.getBoundingClientRect();
          const x = e.pageX - pos.left - size;
          const y = e.pageY - pos.top - size - window.scrollY;
          ripple.style = "top:" + y + "px; left:" + x + "px; width: " + size * 2 + "px; height: " + size * 2 + "px;";
          ripple.classList?.remove("active");
          ripple.classList?.remove("start");
          setTimeout(() => {
            ripple.classList?.add("start");
            setTimeout(() => {
              ripple.classList?.add("active");
            });
          });
        });
        letter.addEventListener("mouseup", (e) => {
          const ripple = letter.querySelector(".ripple");
          clearTimeout(timerId);
          timerId = setTimeout(() => {
            ripple.classList?.remove("active");
            ripple.classList?.remove("start");
          }, 500);
        });
      });
    } catch (err) {
    }
  }

  // source/component/navbar.selek
  function Navbar({
    parentcomponent,
    positioncomponent
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "`                            `",
      parentComponent: parentcomponent,
      positionComponent: positioncomponent,
      state: {},
      event: {},
      attribute: {
        "class": "navbar"
      },
      id: ""
    }), dabMain.createRawComponent(`div`, {
      content: "`                                                                                                                    `",
      parentComponent: positioncomponent,
      positionComponent: "1512600210004005b177128202097410",
      state: {},
      event: {},
      attribute: {
        "class": "action"
      },
      id: ""
    }), dabMain.createRawComponent(`a`, {
      content: "`                        Home                    `",
      parentComponent: "1512600210004005b177128202097410",
      positionComponent: "18003209704840958060100892625990",
      state: {},
      event: {},
      attribute: {
        "href": "/",
        "data-link": ""
      },
      id: ""
    }), dabMain.createRawComponent(`a`, {
      content: "`                        Docs                    `",
      parentComponent: "1512600210004005b177128202097410",
      positionComponent: "1098004660044220a090300008000500",
      state: {},
      event: {},
      attribute: {
        "href": "/docs",
        "data-link": ""
      },
      id: ""
    }), dabMain.createRawComponent(`a`, {
      content: "`                        API                    `",
      parentComponent: "1512600210004005b177128202097410",
      positionComponent: "34002302195647048006404508000102",
      state: {},
      event: {},
      attribute: {
        "href": "/api",
        "data-link": ""
      },
      id: ""
    }), dabMain.createRawComponent(`a`, {
      content: "`                        Config                    `",
      parentComponent: "1512600210004005b177128202097410",
      positionComponent: "41821093100946088608120801723663",
      state: {},
      event: {},
      attribute: {
        "href": "/config",
        "data-link": ""
      },
      id: ""
    }), dabMain.createRawComponent(`a`, {
      content: "`Github`",
      parentComponent: "1512600210004005b177128202097410",
      positionComponent: "21003000151040809509178000905580",
      state: {},
      event: {},
      attribute: {
        "href": "https://github.com/daberpro/dabCom"
      },
      id: ""
    })];
  }

  // source/docs.selek
  function Docs({
    parentcomponent,
    positioncomponent
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "`                                                            `",
      parentComponent: "",
      positionComponent: "80480704004340008000407470800605",
      state: {},
      event: {},
      attribute: {
        "class": "main-content"
      },
      id: ""
    }), ...Navbar({
      "$id": "12060030706242308700100655206003",
      "parentcomponent": "80480704004340008000407470800605",
      "positioncomponent": "80004008130046039190100000426086"
    }), dabMain.createRawComponent(`div`, {
      content: "`                `",
      parentComponent: "80480704004340008000407470800605",
      positionComponent: "52400090810744848003355113045477",
      state: {},
      event: {},
      attribute: {
        "class": "left"
      },
      id: "shortContent"
    }), dabMain.createRawComponent(`div`, {
      content: "`                                    `",
      parentComponent: "80480704004340008000407470800605",
      positionComponent: "19000010120041458910104205300710",
      state: {},
      event: {},
      attribute: {
        "class": "right"
      },
      id: "allContent"
    })];
  }

  // source/api.selek
  function Api({
    parentcomponent,
    positioncomponent
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "`                                                            `",
      parentComponent: "",
      positionComponent: "10100084302040109003469007282009",
      state: {},
      event: {},
      attribute: {
        "class": "main-content"
      },
      id: ""
    }), ...Navbar({
      "$id": "9909069012024370a403680979408405",
      "parentcomponent": "10100084302040109003469007282009",
      "positioncomponent": "1000003268824451a716179620581006"
    }), dabMain.createRawComponent(`div`, {
      content: "`                `",
      parentComponent: "10100084302040109003469007282009",
      positionComponent: "00054002107440758010102055499068",
      state: {},
      event: {},
      attribute: {
        "class": "left"
      },
      id: "shortContent"
    }), dabMain.createRawComponent(`div`, {
      content: "`                                    `",
      parentComponent: "10100084302040109003469007282009",
      positionComponent: "01010337100040008818180103201039",
      state: {},
      event: {},
      attribute: {
        "class": "right"
      },
      id: "allContent"
    })];
  }

  // source/config.selek
  function Config({
    parentcomponent,
    positioncomponent
  }) {
    return [dabMain.createRawComponent(`div`, {
      content: "`                                                            `",
      parentComponent: "",
      positionComponent: "44030000140040868070865500809005",
      state: {},
      event: {},
      attribute: {
        "class": "main-content"
      },
      id: ""
    }), ...Navbar({
      "$id": "62098595900047018700420850402530",
      "parentcomponent": "44030000140040868070865500809005",
      "positioncomponent": "9203822761004020b489614700060802"
    }), dabMain.createRawComponent(`div`, {
      content: "`                `",
      parentComponent: "44030000140040868070865500809005",
      positionComponent: "58059900707344428048107090021200",
      state: {},
      event: {},
      attribute: {
        "class": "left"
      },
      id: "shortContent"
    }), dabMain.createRawComponent(`div`, {
      content: "`                                    `",
      parentComponent: "44030000140040868070865500809005",
      positionComponent: "13260900160845768084124479020024",
      state: {},
      event: {},
      attribute: {
        "class": "right"
      },
      id: "allContent"
    })];
  }

  // source/md/docs.md
  var docs_default = '# # Hello From Seleku\r\nthis site create by seleku-kit and create by daberdev it self\r\n\r\n## # Apa itu seleku ?\r\nseleku adalah framework front end javascript yang berfokus kepada component dan pengembangan web3\r\nframework ini cukup simpel dan di tenagai oleh esbuild sebagai bundler nya\r\n\r\n## # kenapa seleku ?\r\nseleku memungkinkan anda untuk melakukan pembuatan component dari element html yang di tulis langsung\r\ndi dalam sintaks javascript dan beberapa fitur lainya yang memungkinkan anda melakukan development\r\nkhusus bagian frontend web, selain itu seleku di buat dengan sangat simpel dan seleku berjalan dengan dabcom library yang merupakan library utama dari seleku core system\r\n\r\n# # Getting Started\r\n## # instalasi dan requirement\r\nuntuk menggunakan seleku-kit ada terlebih dahulu harus telah memahami dasar dari web development seperti\r\n**html**,**css**,**javascript** dan pemahaman tentang node js dan npm (node package manager)\r\n\r\n#### setup node js\r\njika anda belum memiliki node js maka anda dapat mendownload di **[Download Node JS](https://nodejs.org)** setelah mendownload silahkan ikuti instruksi instalasi yang di berikan kemudian\r\nsilahkan lakukan pengecekan apakah node js telah terinstall di lokal komputer anda dengan mengetikan\r\n\r\n```bash\r\nnode --version\r\n```\r\n\r\njika node js telah terinstall maka anda dapat melihat versi dari node js yang telah di install, jika anda\r\ntelah menginstall node js maka anda juga akan secara otomatis menginstall npm (node package manager) yang akan kita gunakan untuk memanajement project seleku-kit maupun project javascript lainya\r\n\r\nuntuk melihat versi npm jalankan perintah :\r\n\r\n```bash\r\nnpm --version\r\n```\r\n\r\nkemudian untuk menginstall seleku template generator anda cukup menjalan kan perintah berikut\r\n\r\n```bash\r\nnpm i seleku-kit -g\r\n```\r\n\r\nmaka seleku akan di install secara global di komputer anda\r\n\r\n## # Membuat Project Pertama\r\nuntuk membuat project pertama silahkan jalan kan `seleku-kit` di terminal atau command prompt anda maka\r\nanda akan di minta untuk memilih template apa yang akan anda gunakan\r\nkemudian anda akan di minta untuk memasukan nama project baru yang akan anda buat\r\n\r\nsetelah anda membuat template project silahkan jalankan terminal atau command prompt anda di dalam folder\r\nproject yang telah anda buat dengan mengetikan `npm i` kemudian anda jalankan `npm run dev` untuk menjalankan seleku-kit di mode development dan anda akan melihat bahwa seleku berjalan di lokal komputer anda dengan port default bawaan\r\n\r\nsilahkan buka di web browser anda `localhost:3000` dan untuk melihat perubahan silahkan anda edit file\r\n`main.selek`\r\n\r\n# # Sintaks Dasar\r\nSeleku-kit memiliki sintaks yang merupakan gabungan dari HTML dan js sehingga bagi anda yang menggunakan react\r\nmaka anda akan merasa familiar dengan sintaks yang ada untuk memulai mari kita pahami susunan sintaks\r\n\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nRender(<h1>Hello World</h1>,document.body);\r\n\r\n```\r\n#### # Dasar - Dasar\r\n- pada bagian awal kita mengimport **dabMain** dan **Render**, \r\napa itu dab main?, **dabMain** merupakan suatu Object yang memuat semua method dan property yang akan di butuhkan untuk membuat suatu component, \r\nsedangkan **Render** merupakan fungsi yang bertugas untuk menampilkan component ke layar dengan cara memasukan component ke tag HTML yang di targetkan\r\n\r\n- pada baris ke 3 kita menggunakan fungsi **Render** dengan parameter pertama merupakan component yang akan di render dan parameter ke dua merupakan target atau tempat di rampilkan nya component\r\n\r\n## # Comment\r\nuntuk membuat komentar di dalam seleku cukup gunakan /**/ atau multi-line comment\r\nyang ada di javascript\r\n\r\n```jsx\r\n/*ini contoh komentar*/\r\n```\r\n\r\n## # Template Literal\r\nselek-kit menggunakan template literal bawaan javascript untuk menampilkan\r\nsuatu kontent text di dalam html\r\n\r\n##### contoh template literal\r\n```jsx\r\n\r\n    const seleku = "i am seleku-kit";\r\n\r\n    <h1> hello ${seleku}</h1>;\r\n\r\n```\r\n\r\n#### # function component\r\nseleku-kit memungkinkan anda untuk membuat component dari suatu fungsi sebagai berikut\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction Welcome(){\r\n\r\n    return <h1>Welcome to seleku-kit!!</h1>;\r\n\r\n}\r\n\r\nRender(<Welcome><Welcome/>,document.body);\r\n\r\n```\r\n\r\nuntuk menerima argument dari function component lakukan sebagai berikut\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction Welcome({username}){\r\n\r\n    return <h1 state="{{username}}">\r\n        Welcome to seleku-kit!! ${this.state.username}\r\n    </h1>;\r\n\r\n}\r\n\r\nRender(<Welcome username="\'Daberdev\'"><Welcome/>,document.body);\r\n\r\n```\r\n\r\nketika suatu function component menerima argument maka ketika component tersebut di panggil untuk memasukan argumen nya cukup lakukan sperti memasukan attribute di html biasa, untuk saat ini abaikan attribute state dan penggunaan template literal yang ada pada kode tersebut\r\n\r\n> pemberitahuan setiap attribute yang di miliki suatu component akan memiliki value yang di anggap javascript biasa oleh karena itu untuk memasukan suatu string ke dalam attribute gunakan `` atau \'\'\r\n\r\n\r\n## # Attribute Spesial\r\ncomponent di seleku memiliki atribut-atribut khusus maupun umum di antara nya sebagai berikut\r\n\r\n## # $toBeChild \r\nattribute **$toBeChild** merupakan attribute yang di gunakan di dalam parameter suatu funsi component\r\nattribute ini di gunakan untuk memberikan component yang ada di dalam function componentid dari parent component nya agar bisa di gunakan sebagai target untuk component yang ada di dalam function component di render\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction Welcome({$toBeChild}){\r\n\r\n    return <h1>\r\n        Welcome to seleku-kit!! \r\n    </h1>;\r\n\r\n}\r\n\r\nRender(<div><Welcome username="\'Daberdev\'"><Welcome/></div>,document.body);\r\n\r\n```\r\n\r\n## # $beChild \r\nattribute **$beChild** merupakan attribute yang berpasangan dengan attribute **$toBeChild** jika **$toBeChild** hanya memberikan semua properti untuk di gunakan kepada component yang ada di dalam function component maka **$beChild** adalah attribute yang menerima semua properti tersebut untuk kemudian di gunakan oleh component di dalam function component me render\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction Welcome({$toBeChild}){\r\n\r\n    return <h1 $beChild>\r\n        Welcome to seleku-kit!! \r\n    </h1>;\r\n\r\n}\r\n\r\nRender(<div><Welcome username="\'Daberdev\'"><Welcome/></div>,document.body);\r\n\r\n```\r\n\r\n## # $loopComponent \r\nattribute ini merupakan attribute yang hanya di miliki oleh component yang melakukan looping baik di dalam for loop maupun while bahkan array method sekalipun\r\n\r\n```jsx\r\n\r\nasync function AllContributor({$toBeChild}){\r\n\r\n    let loopingComponent = [];\r\n\r\n    const data = await (await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();\r\n\r\n    for (let x of data){\r\n\r\n        loopingComponent = [\r\n            ...loopingComponent,\r\n            ...<img \r\n            $loopComponent="x.node_id"\r\n            title="x.login" \r\n            src="x.avatar_url"/>];\r\n\r\n    }\r\n\r\n    return loopingComponent;\r\n\r\n}\r\n\r\n(async ()=> Render(<div><AllContributor $async></AllContributor></div>))();\r\n\r\n```\r\nattribute ini membutuhkan value yang merupakan id yang unik\r\n\r\n## # component:id\r\nini merupakan attribute yang berfungsi sebagai id dari suatu component\r\n> id yang di definiksan dengan id component berbeda dengan id dari HTML\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nconst card = <div component:id="example_id"></div>;\r\n\r\nRender(card,document.body);\r\n\r\n```\r\n\r\ndan perlu di ingat bahwa **component:id** hanya di miliki oleh component dari HTML bukan dari function\r\ncomponent\r\n\r\n## # state\r\nattribute ini merupakan attribute khusus dan hanya di miliki oleh component dari tag HTML dan bukan dari component function, attribute ini di gunakan untuk memasukan data dinamis yang dapat di ubah-ubah sesuai dengan kebutuhan anda dan untuk data yang di masukan harus dalam bentuk object {{}} kurung kurawal bagian luar merupakan kurung kurawal yang di gunakan untuk memberitahukan kepada kompiler bahwa kode yang terdapat di dalam kurung kurawal pertama akan di eksekusi di sisi kompiler terlebih dahulu agar tidak di anggap sebagai string oleh compiler\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction Card(){\r\n\r\n    return  <div>\r\n                <h1>Hello</h1>\r\n                <p state="{{\r\n                    count: 0\r\n                }}">count ${this.state.count}</p>\r\n            </div>;\r\n\r\n}\r\n\r\nRender(<Card></Card>,document.body);\r\n\r\n```\r\n\r\nuntuk melakukan update pada state anda harus menggunakan fungsi **findById** yang terdapat di dalam dabcom perlu di ketahui bahwa fungsi **findById** adalah fungsi yang memutuhkan id dari suatu component\r\nid dari component berbeda dengan id dari HTML\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render, findById } from "dabcom";\r\n\r\nfunction Card(){\r\n\r\n    return  <div>\r\n                <h1>Hello</h1>\r\n                <p component:id="counting" state="{{\r\n                    count: 0\r\n                }}">count ${this.state.count}</p>\r\n            </div>;\r\n\r\n}\r\n\r\nwindow.setInterval(()=>{\r\n\r\n    findById("counting").state.count++;\r\n\r\n},1000);\r\n\r\nRender(<Card></Card>,document.body);\r\n\r\n```\r\n\r\n## # on:\r\nattribute ini merupakan attribute spesial yang hanya di miliki oleh component dari tag HTML dan bukan dari function component, attribute ini di gunakan untuk membuat event pada component HTML yang di render dan untuk menggunakan cukup dengan `on:nama-event` contoh `on:click` dan untuk value dari attribute ini berupa function seperti berikut `on:click="{()=>{}}"` seleku-kit mengharuskan untuk menggunakan arrow function di dalam attribute on agar tidak terjadi error pada compiler di karena aturan kurung kurawal pertama seperti yang terdapat pada attribute state\r\n\r\n```jsx\r\n\r\nimport { dabMain, Render, findById } from "dabcom";\r\n\r\nfunction Card(){\r\n\r\n    return  <div>\r\n                <h1 on:click="{()=>{\r\n\r\n                    alert(\'hello world\');\r\n\r\n                }}">Hello</h1>\r\n            </div>;\r\n\r\n}\r\n\r\nRender(<Card></Card>,document.body);\r\n\r\n```\r\n\r\n## # $async\r\nattribute ini hanya di miliki oleh component function dan di gunakan untuk\r\nme render async component function dan parent atau component induk dari\r\nasync component function harus merupakan fungsi async\r\n\r\n### contoh\r\n\r\n```jsx\r\n\r\nasync function AllContributor({$toBeChild}){\r\n\r\n    let loopingComponent = [];\r\n\r\n    const data = await (await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();\r\n\r\n    for (let x of data){\r\n\r\n        loopingComponent = [\r\n            ...loopingComponent,\r\n            ...<img \r\n            $loopComponent="x.node_id"\r\n            title="x.login" \r\n            src="x.avatar_url"/>];\r\n\r\n    }\r\n\r\n    return loopingComponent;\r\n\r\n}\r\n\r\nconst App = async ()=>{\r\n    Render(<div><AllContributor $async></AllContributor></div>))();\r\n}\r\n\r\nApp();\r\n\r\n```\r\n\r\n# # Seleku Routing\r\nseleku-kit memiliki sistem routing menggunakan SPA (single page application) bawaan yang dapat anda gunakan\r\ndengan mudah untuk contoh kodenya sebagai berikut\r\n\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\nimport { Router } from "dabcom/spa/route.js";\r\n\r\nfunction Home(){\r\n\r\n    return <h1>Hello World!!</h1>;\r\n\r\n}\r\n\r\n<Router.route \r\n\r\n    path="\'/home\'"\r\n    component="<Home></Home>"\r\n    target="{()=>{\r\n        \r\n        return document.body;\r\n\r\n    }}"\r\n    onRender="{()=>{\r\n\r\n        console.log(\'your in home page\');\r\n\r\n    }}"\r\n\r\n></Router.route>;\r\n\r\n```\r\nberikut adalah penjelasan sintaks di atas \r\n- **Router.route** merupakan suatu fungsi yang di ambil dari dabcom library\r\n- argumen **path** merupakan argument yang di butuhkan oleh router untuk menentukan url bagi component untuk di render\r\n- argument **component** merupakan argument yang menerima component yang akan di render\r\n- argument **target** argument ini di gunakan untuk menerima element / component HTML yang akan menjadi tempat render\r\n- argument **onRender** yaitu argument yang menerima callback function ketika component di render\r\n\r\n## # mengirim data\r\nuntuk mengirimkan data ke dalam router anda cukup menggunakan attribute data\r\ndan untuk mengakses data yang di kirim cukup gunakan this di ikuti dengan nama property dari data yang di kirim\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\nimport { Router } from "dabcom/spa/route.js";\r\n\r\nfunction Home(){\r\n\r\n    return <h1>Hello ${this.user}!!</h1>;\r\n\r\n}\r\n\r\n<Router.route \r\n\r\n    path="\'/home\'"\r\n    component="<Home></Home>"\r\n    target="{()=>{\r\n        \r\n        return document.body;\r\n\r\n    }}"\r\n    onRender="{()=>{\r\n\r\n        console.log(\'your in home page\');\r\n\r\n    }}"\r\n\r\n    data = "{{\r\n        user: \'daber\'\r\n    }}"\r\n\r\n></Router.route>;\r\n\r\n```\r\nuntuk melakukan pemindahan url gunakan element a href di ikuti dengan attribute\r\n**data-link**\r\n\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\nimport { Router } from "dabcom/spa/route.js";\r\n\r\nfunction Home(){\r\n\r\n    return <h1>\r\n        Hello ${this.user}!!\r\n        <a href="\'/about\'" data-link>to About</a>\r\n    </h1>\r\n\r\n}\r\n\r\nfunction About(){\r\n\r\n    return <h1>\r\n        i create by seleku-kit\r\n        <a href="\'/home\'" data-link>to Home</a>\r\n    </h1>\r\n\r\n}\r\n\r\n<Router.route \r\n\r\n    path="\'/home\'"\r\n    component="<Home></Home>"\r\n    target="{()=>{\r\n        \r\n        return document.body;\r\n\r\n    }}"\r\n    onRender="{()=>{\r\n\r\n        console.log(\'your in home page\');\r\n\r\n    }}"\r\n\r\n    data = "{{\r\n        user: \'daber\'\r\n    }}"\r\n\r\n></Router.route>;\r\n\r\n<Router.route \r\n\r\n    path="\'/about\'"\r\n    component="<About></About>"\r\n    target="{()=>{\r\n        \r\n        return document.body;\r\n\r\n    }}"\r\n    onRender="{()=>{\r\n\r\n        console.log(\'your in home page\');\r\n\r\n    }}"\r\n></Router.route>;\r\n\r\n```\r\n\r\n# # Loop Component\r\nseleku juga memungkinkan anda untuk melakukan loop pada component pada bagian\r\nattribute **$loopComponent** anda telah melihat bahwa seleku-kit memiliki attribute tersebut yang harus di gunakan pada saat anda melakukan\r\nlooping pada component baik itu menggunakan for ataupun while bahkan \r\narray method sekalipun\r\n\r\n## # Loop example\r\nseleku-kit sebenarnya melakukan compile yaitu mentransformasi sintaks dari .selek\r\nke .js sehingga suatu component baik itu function component maupun HTML component\r\nakan di ubah menjadi sintaks javascript yang merupakan suatu array ataupun mengembalikan suatu array oleh karena itu ketika anda melakukan looping \r\ndi haruskan untuk mengurai array yang di bentuk oleh compiler kemudian di push\r\nke dalam array yang baru\r\n\r\n### # Contoh For Loop\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nconst allFruits = ["grape","apple","strawberry","pinapple"];\r\n\r\nfunction FruitsName(){\r\n\r\n    let newCompoonent = [];\r\n\r\n    for(let x in allFruits){\r\n        /*ingat anda harus mengisikan id yang unik untuk loop component*/\r\n        newComponent = [\r\n            ...newComponent,\r\n            ...<h1 $loopComponent="x" state="{{content: allFruits[x]}}">\r\n                ${this.state.content}\r\n               </h1>\r\n        ];\r\n\r\n    }\r\n\r\n    /*anda harus mengembalikan array dari component yang baru*/\r\n\r\n    return newComponent;\r\n\r\n}\r\n\r\n```\r\n\r\nuntuk contoh lainya anda dapat melakukan penerapan yang sama baik pada while maupun\r\narray method\r\n\r\n# # Render\r\nsejauh ini kita sering melihat fungsi **Render** di hampir setiap contoh kode\r\ndan telah di jelaskan di beberapa sub-docs bahwa fungsi ini merupakan fungsi\r\nyang di tugaskan untuk me render tetapi apakah hanya untuk me render static?, tentu tidak fungsi ini juga dapat melakukan update render dan melakukan pengiriman\r\ndata ke dalam component yang di render\r\n\r\n### Contoh Kode\r\n\r\n## # Render Update\r\n\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction SayHello({gender}){\r\n\r\n    if(gender === "male"){\r\n\r\n        return <h1>Hello mr</h1>\r\n\r\n    }\r\n\r\n    if(gender === "female"){\r\n\r\n        return <h1>Hello mrs</h1>\r\n\r\n    }\r\n\r\n}\r\n\r\nconst say = Render(<SayHello gender="\'male\'"></SayHello>,document.body);\r\n\r\nsay.updateComponentProperty(SayHello,{\r\n    gender: "female"\r\n});\r\n\r\n```\r\nfungsi **Render** akan mengembalikan suatu fungsi **updateComponentProperty** di mana\r\nfungsi ini akan melakukan update terhadap render dengan properti yang di terima\r\nuntuk parameter pertama pada fungsi ini yaitu component function dan paramter ke 2\r\nmerupakan properti yang akan anda update\r\n\r\n## # Embbed Data\r\n\r\nseperti yang telah di beritahukan bahwa fungsi **Render** dapat melakukan pengiriman data yang akan di embbed ke dalam component dan untuk mengakses nya\r\ncukup gunakan this di ikuti dengan nama property yang di embbed\r\n\r\n```jsx\r\nimport { dabMain, Render } from "dabcom";\r\n\r\nfunction SayHello({gender}){\r\n\r\n    if(gender === "male"){\r\n\r\n        return <h1>Hello mr ${this.username}</h1>\r\n\r\n    }\r\n\r\n    if(gender === "female"){\r\n\r\n        return <h1>Hello mrs ${this.username}</h1>\r\n\r\n    }\r\n\r\n}\r\n\r\nconst say = Render(<SayHello gender="\'male\'"></SayHello>,\r\n            document.body,\r\n            {\r\n                username: "`nanda`"\r\n            });\r\n\r\nsay.updateComponentProperty(SayHello,{\r\n    gender: "female"\r\n});\r\n\r\n```\r\ntapi perlu di ingat bahwa embbed data ini merupakan data statis bukan data dinamis\r\n\r\n# # Whats Next ?\r\nuntuk saat ini seleku masih dalam tahap pengembangan dan akan terus di lakukan\r\nupdate untuk selanjutnya seleku akan memiliki fitur web3 yang saat ini sedang di development ';

  // source/md/api.md
  var api_default = "# All API\r\n## # Render\r\n**`Render : Function`**\r\n\r\n```ts\r\nRender(component: Component, target: HTMLElement, embbedData: Object)\r\n```\r\n\r\n|Argument | Description |\r\n|:--------|:-----------|\r\n|component|komponent yang akan di render bisa berupa component function atau component HTML|\r\n|target| HTMLElement yang akan menjadi tempat di render nya component|\r\n|embbedData| merupakan data bertipe object yang akan di masukan ke dalam component|\r\n\r\n| Method      | Description |\r\n| :----------- | :----------- |\r\n| updateComponentProperty| melakukan update pada component yang di render |\r\n```ts\r\nRender(component: Component, target: HTMLElement, embbedData: Object).updateComponentProperty(componentFunction: ComponentFunctiom,data: Object);\r\n```\r\n\r\n## # findById\r\n**`findById : Function`**\r\n\r\n```ts\r\nfindById(componentId: String)\r\n```\r\n\r\n|Argument | Description |\r\n|:--------|:-----------|\r\n|componentId|component:id dari suatu component|\r\n\r\n## # Router\r\n**`Router : Object`**\r\n\r\n```ts\r\nRouter\r\n```\r\n\r\n| Method      | Description |\r\n| :----------- | :----------- |\r\n| route| melakukan routing|\r\n\r\n```ts\r\nRouter.route(Object: {path: String,target: Function,component: Component,data: Object})\r\n```";

  // source/md/config.md
  var config_default = "# Config\r\nseleku menggunakan esbuild sebagai bundler nya untuk melakukan config maka\r\nanda cukup melakukan pengautran pada file `esbuild.config.json` atau `build.config.json` untuk mendapatkan configurasi silahkan kunjungi web resmi esbuild\r\n**[Esbuild Config](https://esbuild.github.io/getting-started/)**";

  // source/main.selek
  async function AllContributor({
    parentcomponent,
    positioncomponent
  }) {
    let loopingComponent = [];
    const data = await (await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();
    for (let x of data) {
      loopingComponent = [...loopingComponent, ...[dabMain.createRawComponent(`img`, {
        content: "``",
        parentComponent: parentcomponent,
        positionComponent: "15050100149047638600380708000408" + x.node_id,
        state: {},
        event: {},
        attribute: {
          "title": x.login,
          "src": x.avatar_url
        },
        id: ""
      })]];
    }
    return loopingComponent;
  }
  async function MainContent() {
    return [dabMain.createRawComponent(`div`, {
      content: "`                                                                                                            `",
      parentComponent: "",
      positionComponent: "4020200211004506a208910009043000",
      state: {},
      event: {},
      attribute: {
        "class": "hero"
      },
      id: ""
    }), ...Navbar({
      "$id": "7068380070194880a512130000700799",
      "parentcomponent": "4020200211004506a208910009043000",
      "positioncomponent": "10600909100848508250140078423600"
    }), ...DCard({
      "$id": "9300690960954030a600807307908193",
      "$class": "main-panel",
      "parentcomponent": "4020200211004506a208910009043000",
      "positioncomponent": "20020080057040058860700409040707"
    }), dabMain.createRawComponent(`h1`, {
      content: "`                        # Seleku-kit                    `",
      parentComponent: "20020080057040058860700409040707",
      positionComponent: "53406050608840008001196109300008",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`p`, {
      content: "`                        simplify to make the web fast without leaving javascript to write HTML                    `",
      parentComponent: "20020080057040058860700409040707",
      positionComponent: "17400699134244709000909009810095",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...DChips({
      "$id": "19054000640049148434930204810200",
      "parentcomponent": "20020080057040058860700409040707",
      "positioncomponent": "10127005800649168080613206000001"
    }), dabMain.createRawComponent(`i`, {
      content: "``",
      parentComponent: "10127005800649168080613206000001",
      positionComponent: "10820108250449009400300008000000",
      state: {},
      event: {},
      attribute: {
        "class": "fas fa-arrow-down"
      },
      id: ""
    }), dabMain.createRawComponent(`span`, {
      content: "`Read More..`",
      parentComponent: "10127005800649168080613206000001",
      positionComponent: "20036851333340008100180008720940",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`div`, {
      content: "`                                    `",
      parentComponent: "4020200211004506a208910009043000",
      positionComponent: "57852000630040209068100070003309",
      state: {},
      event: {},
      attribute: {
        "class": "saparator"
      },
      id: ""
    }), ...DChips({
      "$id": "28004600540042848026170997043705",
      "parentcomponent": "57852000630040209068100070003309",
      "positioncomponent": "50305090107049109319430037200474"
    }), dabMain.createRawComponent(`h2`, {
      content: "`                            Seleku-kit feature                        `",
      parentComponent: "50305090107049109319430037200474",
      positionComponent: "39500704602942158832580050315480",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`div`, {
      content: "`                                                                            `",
      parentComponent: "4020200211004506a208910009043000",
      positionComponent: "10800047400540269003108001428268",
      state: {},
      event: {},
      attribute: {
        "class": "feature"
      },
      id: ""
    }), ...DCard({
      "$id": "09000030620044148500081668802006",
      "$class": "mini-card",
      "parentcomponent": "10800047400540269003108001428268",
      "positioncomponent": "13100860180149418200606200369840"
    }), dabMain.createRawComponent(`h1`, {
      content: "`Reactive`",
      parentComponent: "13100860180149418200606200369840",
      positionComponent: "14900050120147889390740958887001",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`p`, {
      content: "`                            seleku kit menggunakan reaktivitas untuk melakukan update ui                        `",
      parentComponent: "13100860180149418200606200369840",
      positionComponent: "53159060374840029619126801800041",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...DCard({
      "$id": "19907230100243008896192009065000",
      "$class": "mini-card",
      "parentcomponent": "10800047400540269003108001428268",
      "positioncomponent": "7706099320014069b209190423097060"
    }), dabMain.createRawComponent(`h1`, {
      content: "`Web3`",
      parentComponent: "7706099320014069b209190423097060",
      positionComponent: "45062143133048009099600745320633",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`p`, {
      content: "`                            fitur utama dari seleku kit adalah web3 frontend, membuat website desentralisasi dengan blockchain                        `",
      parentComponent: "7706099320014069b209190423097060",
      positionComponent: "10000363350444409087018608800667",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...DCard({
      "$id": "4069482218004096a400102001015990",
      "$class": "mini-card",
      "parentcomponent": "10800047400540269003108001428268",
      "positioncomponent": "67801536106742008003500149372000"
    }), dabMain.createRawComponent(`h1`, {
      content: "`Metaverse`",
      parentComponent: "67801536106742008003500149372000",
      positionComponent: "24005067133340359005502104000323",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`p`, {
      content: "`                            dukungan penuh dalam pengembangan pemrograman berbasis grafis pada web dan memungkinkan pengembangan metaverse                        `",
      parentComponent: "67801536106742008003500149372000",
      positionComponent: "72801557503641349204303267050550",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...DCard({
      "$id": "9701400010304050b022102080800096",
      "$class": "powered",
      "parentcomponent": "4020200211004506a208910009043000",
      "positioncomponent": "34623711806844008007121004009862"
    }), dabMain.createRawComponent(`h1`, {
      content: "`Powered By EsBuild`",
      parentComponent: "34623711806844008007121004009862",
      positionComponent: "80397000680746008013210000400781",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`p`, {
      content: "`                        seleku kit berjalan diatas esbuild, esbuild sebagai bundler dan memungkinkan developer untuk melakukan banyak hal yang menjadi keterbatasan antara node js dengan frontend                    `",
      parentComponent: "34623711806844008007121004009862",
      positionComponent: "40420134180242058301101433501607",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`div`, {
      content: "`                                                        `",
      parentComponent: "4020200211004506a208910009043000",
      positionComponent: "96030080100840308004303456180400",
      state: {},
      event: {},
      attribute: {
        "class": "contributor"
      },
      id: "a"
    }), dabMain.createRawComponent(`h1`, {
      content: "`Contributors`",
      parentComponent: "96030080100840308004303456180400",
      positionComponent: "4239294010934000a000170970505558",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...await AllContributor({
      "$id": "24941701358040328134102734107080",
      "parentcomponent": "96030080100840308004303456180400",
      "positioncomponent": "6079670020734000a000115696500900"
    })];
  }
  async function allDocsEvent(content) {
    const allDocsContent = findById("allContent").element;
    const shortContent = findById("shortContent").element;
    let allShortName = {};
    let previousParent = null;
    let previousChild = null;
    if (allDocsContent instanceof HTMLElement) {
      allDocsContent.innerHTML = marked.parse(content);
      let allChild = [...allDocsContent.children];
      allChild = allChild.filter((e) => e.nodeName.toLowerCase() === "h1" || e.nodeName.toLowerCase() === "h2" || e.nodeName.toLowerCase() === "h4");
      for (let x of allChild) {
        if (x.nodeName.toLowerCase() === "h1") {
          allShortName[x.textContent.replace(/\s/igm, "")] = Render([dabMain.createRawComponent(`details`, {
            content: "``",
            parentComponent: "",
            positionComponent: "49200063137044908900246016605015",
            state: {},
            event: {},
            attribute: {
              "class": "tree-nav__item is-expandable"
            },
            id: ""
          }), dabMain.createRawComponent(`summary`, {
            content: "`${this.state.content}`",
            parentComponent: "49200063137044908900246016605015",
            positionComponent: "8170053710084021b016333030005115",
            state: {
              content: x.textContent
            },
            event: {
              onclick: () => {
                x.scrollIntoView();
              }
            },
            attribute: {
              "class": "tree-nav__item-title"
            },
            id: ""
          })], shortContent).component.element;
          previousParent = x.textContent.replace(/\s/igm, "");
          previousChild = x.nodeName.toLowerCase();
        } else if (x.nodeName.toLowerCase() === "h2") {
          allShortName[x.textContent.replace(/\s/igm, "")] = Render([dabMain.createRawComponent(`details`, {
            content: "``",
            parentComponent: "",
            positionComponent: "72000007114040009492106038004507",
            state: {},
            event: {},
            attribute: {
              "class": "tree-nav__item is-expandable"
            },
            id: ""
          }), dabMain.createRawComponent(`summary`, {
            content: "`${this.state.content}`",
            parentComponent: "72000007114040009492106038004507",
            positionComponent: "1091160009204031b020100800200040",
            state: {
              content: x.textContent
            },
            event: {
              onclick: () => {
                x.scrollIntoView();
              }
            },
            attribute: {
              "class": "tree-nav__item-title"
            },
            id: ""
          })], allShortName[previousParent]).component.element;
          previousChild = x.nodeName.toLowerCase();
          if (previousChild !== "h2") {
            previousParent = x.textContent.replace(/\s/igm, "");
          }
        } else {
          allShortName[x.textContent.replace(/\s/igm, "")] = Render([dabMain.createRawComponent(`summary`, {
            content: "`${this.state.content}`",
            parentComponent: "",
            positionComponent: "24005807030040659890806160748600",
            state: {
              content: x.textContent
            },
            event: {
              onclick: () => {
                x.scrollIntoView();
              }
            },
            attribute: {
              "class": "tree-nav__item-title"
            },
            id: ""
          })], allShortName[previousParent]).component.element;
        }
      }
    }
    hljs.highlightAll();
    let options2 = {
      contentSelector: ".main-content",
      copyIconClass: "fas fa-copy",
      checkIconClass: "fas fa-check text-success"
    };
    window.highlightJsBadge(options2);
    Render([dabMain.createRawComponent(`button`, {
      content: "``",
      parentComponent: "",
      positionComponent: "1086900460944011a010148007003006",
      state: {},
      event: {
        onclick: () => {
          shortContent.classList.toggle("show");
        }
      },
      attribute: {
        "class": "panel-btn"
      },
      id: ""
    }), dabMain.createRawComponent(`i`, {
      content: "``",
      parentComponent: "1086900460944011a010148007003006",
      positionComponent: "10864400620040008006504400000009",
      state: {},
      event: {},
      attribute: {
        "class": "fas fa-bars"
      },
      id: ""
    })], allDocsContent);
  }
  async function main() {
    Router.route({
      "$id": "31188208700648858588120763600404",
      "path": "/",
      "component": await MainContent({
        "$id": "8041535089084000a580100933020500"
      }),
      "target": () => {
        return document.body;
      },
      "onrender": () => {
        setRipple();
      }
    });
  }
  main();
  Router.route({
    "$id": "21640518403340058090102002707050",
    "path": "/docs",
    "component": Docs({
      "$id": "63170439101643828009070404111204"
    }),
    "target": () => {
      return document.body;
    },
    "onrender": () => {
      allDocsEvent(docs_default);
    }
  });
  Router.route({
    "$id": "11309680808740598200100002801117",
    "path": "/api",
    "component": Api({
      "$id": "8008802616004006b923503003640014"
    }),
    "target": () => {
      return document.body;
    },
    "onrender": () => {
      allDocsEvent(api_default);
    }
  });
  Router.route({
    "$id": "10458591800740058388100955041937",
    "path": "/config",
    "component": Config({
      "$id": "10008000529047408450902609730080"
    }),
    "target": () => {
      return document.body;
    },
    "onrender": () => {
      allDocsEvent(config_default);
    }
  });
})();
