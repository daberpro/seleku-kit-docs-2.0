(()=>{function ie(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}var D=ie();function ge(o){D=o}var ke=/[&<>"']/,fe=/[&<>"']/g,be=/[<>"']|&(?!#?\w+;)/,we=/[<>"']|&(?!#?\w+;)/g,xe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Y=o=>xe[o];function x(o,e){if(e){if(ke.test(o))return o.replace(fe,Y)}else if(be.test(o))return o.replace(we,Y);return o}var Ce=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function oe(o){return o.replace(Ce,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}var ye=/(^|[^\[])\^/g;function f(o,e){o=o.source||o,e=e||"";let n={replace:(t,a)=>(a=a.source||a,a=a.replace(ye,"$1"),o=o.replace(t,a),n),getRegex:()=>new RegExp(o,e)};return n}var Re=/[^\w:]/g,ve=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function K(o,e,n){if(o){let t;try{t=decodeURIComponent(oe(n)).replace(Re,"").toLowerCase()}catch{return null}if(t.indexOf("javascript:")===0||t.indexOf("vbscript:")===0||t.indexOf("data:")===0)return null}e&&!ve.test(n)&&(n=je(e,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}var q={},_e=/^[^:]+:\/*[^/]*$/,$e=/^([^:]+:)[\s\S]*$/,Te=/^([^:]+:\/*[^/]*)[\s\S]*$/;function je(o,e){q[" "+o]||(_e.test(o)?q[" "+o]=o+"/":q[" "+o]=N(o,"/",!0)),o=q[" "+o];let n=o.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:o.replace($e,"$1")+e:e.charAt(0)==="/"?n?e:o.replace(Te,"$1")+e:o+e}var P={exec:function(){}};function R(o){let e=1,n,t;for(;e<arguments.length;e++){n=arguments[e];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(o[t]=n[t])}return o}function ee(o,e){let n=o.replace(/\|/g,(i,r,s)=>{let l=!1,c=r;for(;--c>=0&&s[c]==="\\";)l=!l;return l?"|":" |"}),t=n.split(/ \|/),a=0;if(t[0].trim()||t.shift(),t.length>0&&!t[t.length-1].trim()&&t.pop(),t.length>e)t.splice(e);else for(;t.length<e;)t.push("");for(;a<t.length;a++)t[a]=t[a].trim().replace(/\\\|/g,"|");return t}function N(o,e,n){let t=o.length;if(t===0)return"";let a=0;for(;a<t;){let i=o.charAt(t-a-1);if(i===e&&!n)a++;else if(i!==e&&n)a++;else break}return o.substr(0,t-a)}function Se(o,e){if(o.indexOf(e[1])===-1)return-1;let n=o.length,t=0,a=0;for(;a<n;a++)if(o[a]==="\\")a++;else if(o[a]===e[0])t++;else if(o[a]===e[1]&&(t--,t<0))return a;return-1}function re(o){o&&o.sanitize&&!o.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function te(o,e){if(e<1)return"";let n="";for(;e>1;)e&1&&(n+=o),e>>=1,o+=o;return n+o}function ne(o,e,n,t){let a=e.href,i=e.title?x(e.title):null,r=o[1].replace(/\\([\[\]])/g,"$1");if(o[0].charAt(0)!=="!"){t.state.inLink=!0;let s={type:"link",raw:n,href:a,title:i,text:r,tokens:t.inlineTokens(r,[])};return t.state.inLink=!1,s}else return{type:"image",raw:n,href:a,title:i,text:x(r)}}function ze(o,e){let n=o.match(/^(\s+)(?:```)/);if(n===null)return e;let t=n[1];return e.split(`
`).map(a=>{let i=a.match(/^\s+/);if(i===null)return a;let[r]=i;return r.length>=t.length?a.slice(t.length):a}).join(`
`)}var Z=class{constructor(e){this.options=e||D}space(e){let n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){let n=this.rules.block.code.exec(e);if(n){let t=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?t:N(t,`
`)}}}fences(e){let n=this.rules.block.fences.exec(e);if(n){let t=n[0],a=ze(t,n[3]||"");return{type:"code",raw:t,lang:n[2]?n[2].trim():n[2],text:a}}}heading(e){let n=this.rules.block.heading.exec(e);if(n){let t=n[2].trim();if(/#$/.test(t)){let i=N(t,"#");(this.options.pedantic||!i||/ $/.test(i))&&(t=i.trim())}let a={type:"heading",raw:n[0],depth:n[1].length,text:t,tokens:[]};return this.lexer.inline(a.text,a.tokens),a}}hr(e){let n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){let n=this.rules.block.blockquote.exec(e);if(n){let t=n[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:n[0],tokens:this.lexer.blockTokens(t,[]),text:t}}}list(e){let n=this.rules.block.list.exec(e);if(n){let t,a,i,r,s,l,c,h,w,k,m,M,y=n[1].trim(),$=y.length>1,b={type:"list",raw:"",ordered:$,start:$?+y.slice(0,-1):"",loose:!1,items:[]};y=$?`\\d{1,9}\\${y.slice(-1)}`:`\\${y}`,this.options.pedantic&&(y=$?y:"[*+-]");let C=new RegExp(`^( {0,3}${y})((?: [^\\n]*)?(?:\\n|$))`);for(;e&&(M=!1,!(!(n=C.exec(e))||this.rules.block.hr.test(e)));){if(t=n[0],e=e.substring(t.length),h=n[2].split(`
`,1)[0],w=e.split(`
`,1)[0],this.options.pedantic?(r=2,m=h.trimLeft()):(r=n[2].search(/[^ ]/),r=r>4?1:r,m=h.slice(r),r+=n[1].length),l=!1,!h&&/^ *$/.test(w)&&(t+=w+`
`,e=e.substring(w.length+1),M=!0),!M){let j=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])`);for(;e&&(k=e.split(`
`,1)[0],h=k,this.options.pedantic&&(h=h.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!j.test(h));){if(h.search(/[^ ]/)>=r||!h.trim())m+=`
`+h.slice(r);else if(!l)m+=`
`+h;else break;!l&&!h.trim()&&(l=!0),t+=k+`
`,e=e.substring(k.length+1)}}b.loose||(c?b.loose=!0:/\n *\n *$/.test(t)&&(c=!0)),this.options.gfm&&(a=/^\[[ xX]\] /.exec(m),a&&(i=a[0]!=="[ ] ",m=m.replace(/^\[[ xX]\] +/,""))),b.items.push({type:"list_item",raw:t,task:!!a,checked:i,loose:!1,text:m}),b.raw+=t}b.items[b.items.length-1].raw=t.trimRight(),b.items[b.items.length-1].text=m.trimRight(),b.raw=b.raw.trimRight();let L=b.items.length;for(s=0;s<L;s++){this.lexer.state.top=!1,b.items[s].tokens=this.lexer.blockTokens(b.items[s].text,[]);let j=b.items[s].tokens.filter(z=>z.type==="space"),S=j.every(z=>{let O=z.raw.split(""),B=0;for(let he of O)if(he===`
`&&(B+=1),B>1)return!0;return!1});!b.loose&&j.length&&S&&(b.loose=!0,b.items[s].loose=!0)}return b}}html(e){let n=this.rules.block.html.exec(e);if(n){let t={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};return this.options.sanitize&&(t.type="paragraph",t.text=this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]),t.tokens=[],this.lexer.inline(t.text,t.tokens)),t}}def(e){let n=this.rules.block.def.exec(e);if(n){n[3]&&(n[3]=n[3].substring(1,n[3].length-1));let t=n[1].toLowerCase().replace(/\s+/g," ");return{type:"def",tag:t,raw:n[0],href:n[2],title:n[3]}}}table(e){let n=this.rules.block.table.exec(e);if(n){let t={type:"table",header:ee(n[1]).map(a=>({text:a})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(t.header.length===t.align.length){t.raw=n[0];let a=t.align.length,i,r,s,l;for(i=0;i<a;i++)/^ *-+: *$/.test(t.align[i])?t.align[i]="right":/^ *:-+: *$/.test(t.align[i])?t.align[i]="center":/^ *:-+ *$/.test(t.align[i])?t.align[i]="left":t.align[i]=null;for(a=t.rows.length,i=0;i<a;i++)t.rows[i]=ee(t.rows[i],t.header.length).map(c=>({text:c}));for(a=t.header.length,r=0;r<a;r++)t.header[r].tokens=[],this.lexer.inlineTokens(t.header[r].text,t.header[r].tokens);for(a=t.rows.length,r=0;r<a;r++)for(l=t.rows[r],s=0;s<l.length;s++)l[s].tokens=[],this.lexer.inlineTokens(l[s].text,l[s].tokens);return t}}}lheading(e){let n=this.rules.block.lheading.exec(e);if(n){let t={type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}paragraph(e){let n=this.rules.block.paragraph.exec(e);if(n){let t={type:"paragraph",raw:n[0],text:n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}text(e){let n=this.rules.block.text.exec(e);if(n){let t={type:"text",raw:n[0],text:n[0],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}escape(e){let n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:x(n[1])}}tag(e){let n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]):n[0]}}link(e){let n=this.rules.inline.link.exec(e);if(n){let t=n[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;let r=N(t.slice(0,-1),"\\");if((t.length-r.length)%2===0)return}else{let r=Se(n[2],"()");if(r>-1){let l=(n[0].indexOf("!")===0?5:4)+n[1].length+r;n[2]=n[2].substring(0,r),n[0]=n[0].substring(0,l).trim(),n[3]=""}}let a=n[2],i="";if(this.options.pedantic){let r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(a);r&&(a=r[1],i=r[3])}else i=n[3]?n[3].slice(1,-1):"";return a=a.trim(),/^</.test(a)&&(this.options.pedantic&&!/>$/.test(t)?a=a.slice(1):a=a.slice(1,-1)),ne(n,{href:a&&a.replace(this.rules.inline._escapes,"$1"),title:i&&i.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(e,n){let t;if((t=this.rules.inline.reflink.exec(e))||(t=this.rules.inline.nolink.exec(e))){let a=(t[2]||t[1]).replace(/\s+/g," ");if(a=n[a.toLowerCase()],!a||!a.href){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return ne(t,a,t[0],this.lexer)}}emStrong(e,n,t=""){let a=this.rules.inline.emStrong.lDelim.exec(e);if(!a||a[3]&&t.match(/[\p{L}\p{N}]/u))return;let i=a[1]||a[2]||"";if(!i||i&&(t===""||this.rules.inline.punctuation.exec(t))){let r=a[0].length-1,s,l,c=r,h=0,w=a[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(w.lastIndex=0,n=n.slice(-1*e.length+r);(a=w.exec(n))!=null;){if(s=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!s)continue;if(l=s.length,a[3]||a[4]){c+=l;continue}else if((a[5]||a[6])&&r%3&&!((r+l)%3)){h+=l;continue}if(c-=l,c>0)continue;if(l=Math.min(l,l+c+h),Math.min(r,l)%2){let m=e.slice(1,r+a.index+l);return{type:"em",raw:e.slice(0,r+a.index+l+1),text:m,tokens:this.lexer.inlineTokens(m,[])}}let k=e.slice(2,r+a.index+l-1);return{type:"strong",raw:e.slice(0,r+a.index+l+1),text:k,tokens:this.lexer.inlineTokens(k,[])}}}}codespan(e){let n=this.rules.inline.code.exec(e);if(n){let t=n[2].replace(/\n/g," "),a=/[^ ]/.test(t),i=/^ /.test(t)&&/ $/.test(t);return a&&i&&(t=t.substring(1,t.length-1)),t=x(t,!0),{type:"codespan",raw:n[0],text:t}}}br(e){let n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){let n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2],[])}}autolink(e,n){let t=this.rules.inline.autolink.exec(e);if(t){let a,i;return t[2]==="@"?(a=x(this.options.mangle?n(t[1]):t[1]),i="mailto:"+a):(a=x(t[1]),i=a),{type:"link",raw:t[0],text:a,href:i,tokens:[{type:"text",raw:a,text:a}]}}}url(e,n){let t;if(t=this.rules.inline.url.exec(e)){let a,i;if(t[2]==="@")a=x(this.options.mangle?n(t[0]):t[0]),i="mailto:"+a;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0];while(r!==t[0]);a=x(t[0]),t[1]==="www."?i="http://"+a:i=a}return{type:"link",raw:t[0],text:a,href:i,tokens:[{type:"text",raw:a,text:a}]}}}inlineText(e,n){let t=this.rules.inline.text.exec(e);if(t){let a;return this.lexer.state.inRawBlock?a=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):x(t[0]):t[0]:a=x(this.options.smartypants?n(t[0]):t[0]),{type:"text",raw:t[0],text:a}}}},d={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:P,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};d._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;d._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;d.def=f(d.def).replace("label",d._label).replace("title",d._title).getRegex();d.bullet=/(?:[*+-]|\d{1,9}[.)])/;d.listItemStart=f(/^( *)(bull) */).replace("bull",d.bullet).getRegex();d.list=f(d.list).replace(/bull/g,d.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+d.def.source+")").getRegex();d._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";d._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;d.html=f(d.html,"i").replace("comment",d._comment).replace("tag",d._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();d.paragraph=f(d._paragraph).replace("hr",d.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",d._tag).getRegex();d.blockquote=f(d.blockquote).replace("paragraph",d.paragraph).getRegex();d.normal=R({},d);d.gfm=R({},d.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});d.gfm.table=f(d.gfm.table).replace("hr",d.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",d._tag).getRegex();d.gfm.paragraph=f(d._paragraph).replace("hr",d.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",d.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",d._tag).getRegex();d.pedantic=R({},d.normal,{html:f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",d._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:P,paragraph:f(d.normal._paragraph).replace("hr",d.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",d.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var p={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:P,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:P,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};p._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";p.punctuation=f(p.punctuation).replace(/punctuation/g,p._punctuation).getRegex();p.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;p.escapedEmSt=/\\\*|\\_/g;p._comment=f(d._comment).replace("(?:-->|$)","-->").getRegex();p.emStrong.lDelim=f(p.emStrong.lDelim).replace(/punct/g,p._punctuation).getRegex();p.emStrong.rDelimAst=f(p.emStrong.rDelimAst,"g").replace(/punct/g,p._punctuation).getRegex();p.emStrong.rDelimUnd=f(p.emStrong.rDelimUnd,"g").replace(/punct/g,p._punctuation).getRegex();p._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;p._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;p._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;p.autolink=f(p.autolink).replace("scheme",p._scheme).replace("email",p._email).getRegex();p._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;p.tag=f(p.tag).replace("comment",p._comment).replace("attribute",p._attribute).getRegex();p._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;p._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;p._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;p.link=f(p.link).replace("label",p._label).replace("href",p._href).replace("title",p._title).getRegex();p.reflink=f(p.reflink).replace("label",p._label).replace("ref",d._label).getRegex();p.nolink=f(p.nolink).replace("ref",d._label).getRegex();p.reflinkSearch=f(p.reflinkSearch,"g").replace("reflink",p.reflink).replace("nolink",p.nolink).getRegex();p.normal=R({},p);p.pedantic=R({},p.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",p._label).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",p._label).getRegex()});p.gfm=R({},p.normal,{escape:f(p.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});p.gfm.url=f(p.gfm.url,"i").replace("email",p.gfm._extended_email).getRegex();p.breaks=R({},p.gfm,{br:f(p.br).replace("{2,}","*").getRegex(),text:f(p.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function Ae(o){return o.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function ae(o){let e="",n,t,a=o.length;for(n=0;n<a;n++)t=o.charCodeAt(n),Math.random()>.5&&(t="x"+t.toString(16)),e+="&#"+t+";";return e}var v=class{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||D,this.options.tokenizer=this.options.tokenizer||new Z,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:d.normal,inline:p.normal};this.options.pedantic?(n.block=d.pedantic,n.inline=p.pedantic):this.options.gfm&&(n.block=d.gfm,this.options.breaks?n.inline=p.breaks:n.inline=p.gfm),this.tokenizer.rules=n}static get rules(){return{block:d,inline:p}}static lex(e,n){return new v(n).lex(e)}static lexInline(e,n){return new v(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`).replace(/\t/g,"    "),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(e,n=[]){this.options.pedantic&&(e=e.replace(/^ +$/gm,""));let t,a,i,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>(t=s.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length),t.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length),a=n[n.length-1],a&&(a.type==="paragraph"||a.type==="text")?(a.raw+=`
`+t.raw,a.text+=`
`+t.text,this.inlineQueue[this.inlineQueue.length-1].src=a.text):n.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length),a=n[n.length-1],a&&(a.type==="paragraph"||a.type==="text")?(a.raw+=`
`+t.raw,a.text+=`
`+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=a.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title});continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(i=e,this.options.extensions&&this.options.extensions.startBlock){let s=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(function(h){c=h.call({lexer:this},l),typeof c=="number"&&c>=0&&(s=Math.min(s,c))}),s<1/0&&s>=0&&(i=e.substring(0,s+1))}if(this.state.top&&(t=this.tokenizer.paragraph(i))){a=n[n.length-1],r&&a.type==="paragraph"?(a.raw+=`
`+t.raw,a.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):n.push(t),r=i.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length),a=n[n.length-1],a&&a.type==="text"?(a.raw+=`
`+t.raw,a.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=a.text):n.push(t);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(e,n){this.inlineQueue.push({src:e,tokens:n})}inlineTokens(e,n=[]){let t,a,i,r=e,s,l,c;if(this.tokens.links){let h=Object.keys(this.tokens.links);if(h.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)h.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+te("a",s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,s.index)+"["+te("a",s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.escapedEmSt.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(l||(c=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(h=>(t=h.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.escape(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.tag(e)){e=e.substring(t.raw.length),a=n[n.length-1],a&&t.type==="text"&&a.type==="text"?(a.raw+=t.raw,a.text+=t.text):n.push(t);continue}if(t=this.tokenizer.link(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(t.raw.length),a=n[n.length-1],a&&t.type==="text"&&a.type==="text"?(a.raw+=t.raw,a.text+=t.text):n.push(t);continue}if(t=this.tokenizer.emStrong(e,r,c)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.codespan(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.br(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.del(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.autolink(e,ae)){e=e.substring(t.raw.length),n.push(t);continue}if(!this.state.inLink&&(t=this.tokenizer.url(e,ae))){e=e.substring(t.raw.length),n.push(t);continue}if(i=e,this.options.extensions&&this.options.extensions.startInline){let h=1/0,w=e.slice(1),k;this.options.extensions.startInline.forEach(function(m){k=m.call({lexer:this},w),typeof k=="number"&&k>=0&&(h=Math.min(h,k))}),h<1/0&&h>=0&&(i=e.substring(0,h+1))}if(t=this.tokenizer.inlineText(i,Ae)){e=e.substring(t.raw.length),t.raw.slice(-1)!=="_"&&(c=t.raw.slice(-1)),l=!0,a=n[n.length-1],a&&a.type==="text"?(a.raw+=t.raw,a.text+=t.text):n.push(t);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return n}},W=class{constructor(e){this.options=e||D}code(e,n,t){let a=(n||"").match(/\S*/)[0];if(this.options.highlight){let i=this.options.highlight(e,a);i!=null&&i!==e&&(t=!0,e=i)}return e=e.replace(/\n$/,"")+`
`,a?'<pre><code class="'+this.options.langPrefix+x(a,!0)+'">'+(t?e:x(e,!0))+`</code></pre>
`:"<pre><code>"+(t?e:x(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
`+e+`</blockquote>
`}html(e){return e}heading(e,n,t,a){return this.options.headerIds?"<h"+n+' id="'+this.options.headerPrefix+a.slug(t)+'">'+e+"</h"+n+`>
`:"<h"+n+">"+e+"</h"+n+`>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,n,t){let a=n?"ol":"ul",i=n&&t!==1?' start="'+t+'"':"";return"<"+a+i+`>
`+e+"</"+a+`>
`}listitem(e){return"<li>"+e+`</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+`</p>
`}table(e,n){return n&&(n="<tbody>"+n+"</tbody>"),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
`+e+`</tr>
`}tablecell(e,n){let t=n.header?"th":"td";return(n.align?"<"+t+' align="'+n.align+'">':"<"+t+">")+e+"</"+t+`>
`}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,n,t){if(e=K(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let a='<a href="'+x(e)+'"';return n&&(a+=' title="'+n+'"'),a+=">"+t+"</a>",a}image(e,n,t){if(e=K(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let a='<img src="'+e+'" alt="'+t+'"';return n&&(a+=' title="'+n+'"'),a+=this.options.xhtml?"/>":">",a}text(e){return e}},F=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,t){return""+t}image(e,n,t){return""+t}br(){return""}},Q=class{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,n){let t=e,a=0;if(this.seen.hasOwnProperty(t)){a=this.seen[e];do a++,t=e+"-"+a;while(this.seen.hasOwnProperty(t))}return n||(this.seen[e]=a,this.seen[t]=0),t}slug(e,n={}){let t=this.serialize(e);return this.getNextSafeSlug(t,n.dryrun)}},_=class{constructor(e){this.options=e||D,this.options.renderer=this.options.renderer||new W,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new F,this.slugger=new Q}static parse(e,n){return new _(n).parse(e)}static parseInline(e,n){return new _(n).parseInline(e)}parse(e,n=!0){let t="",a,i,r,s,l,c,h,w,k,m,M,y,$,b,C,L,j,S,z,O=e.length;for(a=0;a<O;a++){if(m=e[a],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[m.type]&&(z=this.options.extensions.renderers[m.type].call({parser:this},m),z!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(m.type))){t+=z||"";continue}switch(m.type){case"space":continue;case"hr":{t+=this.renderer.hr();continue}case"heading":{t+=this.renderer.heading(this.parseInline(m.tokens),m.depth,oe(this.parseInline(m.tokens,this.textRenderer)),this.slugger);continue}case"code":{t+=this.renderer.code(m.text,m.lang,m.escaped);continue}case"table":{for(w="",h="",s=m.header.length,i=0;i<s;i++)h+=this.renderer.tablecell(this.parseInline(m.header[i].tokens),{header:!0,align:m.align[i]});for(w+=this.renderer.tablerow(h),k="",s=m.rows.length,i=0;i<s;i++){for(c=m.rows[i],h="",l=c.length,r=0;r<l;r++)h+=this.renderer.tablecell(this.parseInline(c[r].tokens),{header:!1,align:m.align[r]});k+=this.renderer.tablerow(h)}t+=this.renderer.table(w,k);continue}case"blockquote":{k=this.parse(m.tokens),t+=this.renderer.blockquote(k);continue}case"list":{for(M=m.ordered,y=m.start,$=m.loose,s=m.items.length,k="",i=0;i<s;i++)C=m.items[i],L=C.checked,j=C.task,b="",C.task&&(S=this.renderer.checkbox(L),$?C.tokens.length>0&&C.tokens[0].type==="paragraph"?(C.tokens[0].text=S+" "+C.tokens[0].text,C.tokens[0].tokens&&C.tokens[0].tokens.length>0&&C.tokens[0].tokens[0].type==="text"&&(C.tokens[0].tokens[0].text=S+" "+C.tokens[0].tokens[0].text)):C.tokens.unshift({type:"text",text:S}):b+=S),b+=this.parse(C.tokens,$),k+=this.renderer.listitem(b,j,L);t+=this.renderer.list(k,M,y);continue}case"html":{t+=this.renderer.html(m.text);continue}case"paragraph":{t+=this.renderer.paragraph(this.parseInline(m.tokens));continue}case"text":{for(k=m.tokens?this.parseInline(m.tokens):m.text;a+1<O&&e[a+1].type==="text";)m=e[++a],k+=`
`+(m.tokens?this.parseInline(m.tokens):m.text);t+=n?this.renderer.paragraph(k):k;continue}default:{let B='Token with "'+m.type+'" type was not found.';if(this.options.silent){console.error(B);return}else throw new Error(B)}}}return t}parseInline(e,n){n=n||this.renderer;let t="",a,i,r,s=e.length;for(a=0;a<s;a++){if(i=e[a],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]&&(r=this.options.extensions.renderers[i.type].call({parser:this},i),r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type))){t+=r||"";continue}switch(i.type){case"escape":{t+=n.text(i.text);break}case"html":{t+=n.html(i.text);break}case"link":{t+=n.link(i.href,i.title,this.parseInline(i.tokens,n));break}case"image":{t+=n.image(i.href,i.title,i.text);break}case"strong":{t+=n.strong(this.parseInline(i.tokens,n));break}case"em":{t+=n.em(this.parseInline(i.tokens,n));break}case"codespan":{t+=n.codespan(i.text);break}case"br":{t+=n.br();break}case"del":{t+=n.del(this.parseInline(i.tokens,n));break}case"text":{t+=n.text(i.text);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent){console.error(l);return}else throw new Error(l)}}}return t}};function g(o,e,n){if(typeof o>"u"||o===null)throw new Error("marked(): input parameter is undefined or null");if(typeof o!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(o)+", string expected");if(typeof e=="function"&&(n=e,e=null),e=R({},g.defaults,e||{}),re(e),n){let t=e.highlight,a;try{a=v.lex(o,e)}catch(s){return n(s)}let i=function(s){let l;if(!s)try{e.walkTokens&&g.walkTokens(a,e.walkTokens),l=_.parse(a,e)}catch(c){s=c}return e.highlight=t,s?n(s):n(null,l)};if(!t||t.length<3||(delete e.highlight,!a.length))return i();let r=0;g.walkTokens(a,function(s){s.type==="code"&&(r++,setTimeout(()=>{t(s.text,s.lang,function(l,c){if(l)return i(l);c!=null&&c!==s.text&&(s.text=c,s.escaped=!0),r--,r===0&&i()})},0))}),r===0&&i();return}try{let t=v.lex(o,e);return e.walkTokens&&g.walkTokens(t,e.walkTokens),_.parse(t,e)}catch(t){if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(t.message+"",!0)+"</pre>";throw t}}g.options=g.setOptions=function(o){return R(g.defaults,o),ge(g.defaults),g};g.getDefaults=ie;g.defaults=D;g.use=function(...o){let e=R({},...o),n=g.defaults.extensions||{renderers:{},childTokens:{}},t;o.forEach(a=>{if(a.extensions&&(t=!0,a.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if(i.renderer){let r=n.renderers?n.renderers[i.name]:null;r?n.renderers[i.name]=function(...s){let l=i.renderer.apply(this,s);return l===!1&&(l=r.apply(this,s)),l}:n.renderers[i.name]=i.renderer}if(i.tokenizer){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");n[i.level]?n[i.level].unshift(i.tokenizer):n[i.level]=[i.tokenizer],i.start&&(i.level==="block"?n.startBlock?n.startBlock.push(i.start):n.startBlock=[i.start]:i.level==="inline"&&(n.startInline?n.startInline.push(i.start):n.startInline=[i.start]))}i.childTokens&&(n.childTokens[i.name]=i.childTokens)})),a.renderer){let i=g.defaults.renderer||new W;for(let r in a.renderer){let s=i[r];i[r]=(...l)=>{let c=a.renderer[r].apply(i,l);return c===!1&&(c=s.apply(i,l)),c}}e.renderer=i}if(a.tokenizer){let i=g.defaults.tokenizer||new Z;for(let r in a.tokenizer){let s=i[r];i[r]=(...l)=>{let c=a.tokenizer[r].apply(i,l);return c===!1&&(c=s.apply(i,l)),c}}e.tokenizer=i}if(a.walkTokens){let i=g.defaults.walkTokens;e.walkTokens=function(r){a.walkTokens.call(this,r),i&&i.call(this,r)}}t&&(e.extensions=n),g.setOptions(e)})};g.walkTokens=function(o,e){for(let n of o)switch(e.call(g,n),n.type){case"table":{for(let t of n.header)g.walkTokens(t.tokens,e);for(let t of n.rows)for(let a of t)g.walkTokens(a.tokens,e);break}case"list":{g.walkTokens(n.items,e);break}default:g.defaults.extensions&&g.defaults.extensions.childTokens&&g.defaults.extensions.childTokens[n.type]?g.defaults.extensions.childTokens[n.type].forEach(function(t){g.walkTokens(n[t],e)}):n.tokens&&g.walkTokens(n.tokens,e)}};g.parseInline=function(o,e){if(typeof o>"u"||o===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof o!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(o)+", string expected");e=R({},g.defaults,e||{}),re(e);try{let n=v.lexInline(o,e);return e.walkTokens&&g.walkTokens(n,e.walkTokens),_.parseInline(n,e)}catch(n){if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(n.message+"",!0)+"</pre>";throw n}};g.Parser=_;g.parser=_.parse;g.Renderer=W;g.TextRenderer=F;g.Lexer=v;g.lexer=v.lex;g.Tokenizer=Z;g.Slugger=Q;g.parse=g;var Ee=g.options,Oe=g.setOptions,qe=g.use,Ne=g.walkTokens,Pe=g.parseInline;var Ze=_.parse,We=v.lex;var H=class{#e=null;#t=null;constructor(e){this.#e=e.Getter,this.#t=e.Setter}setReactive(e){typeof this.#e!="function"&&(this.#e=()=>{}),typeof this.#t!="function"&&(this.#e=()=>{});let n=this.#e,t=this.#t;return new Proxy(e,{get(i,r){return n(i,r)||i[r]},set(i,r,s){return typeof s=="function"?e[r]=s(i,r,s)||null:e[r]=s,t(i,r,s),1}})}};var G=class{#allComponentId={};#kindOfComponentBindingData={};createRawComponent(o,e){return{name:o,content:e?.content,attribute:e?.attribute,parentComponent:e?.parentComponent,positionComponent:e?.positionComponent,state:e?.state||{},event:e?.event||{},id:e?.id}}createComponent(rawComponent,embedData={}){let element=document.createElement(rawComponent.name);if(rawComponent?.attribute instanceof Object)for(let o in rawComponent?.attribute)element.setAttribute(o,rawComponent?.attribute[o]);let textNode=document.createTextNode(rawComponent?.content);return element.appendChild(textNode),{element,content:textNode,rawContent:rawComponent?.content,parent:rawComponent.parentComponent,position:rawComponent.positionComponent,state:rawComponent?.state,event:rawComponent?.event,...embedData,destroy(o=()=>{}){o(),element.remove()},updateTextNode(){let text=this.rawContent,resultText=eval(text);this.content.replaceData(0,text.length,resultText)},updateAttribute(){}}}renderComponent(o,e,n={}){let t=[],a={},i=this.#kindOfComponentBindingData;for(let s of o){let l=this.createComponent(s,n);if(a={...a,...l.state},s?.id&&(this.#allComponentId[s?.id]={...l,state:new H({Getter(c,h){return c[h]},Setter(c,h,w){for(let k of i[h])k.state[h]=w,k.updateTextNode()}}).setReactive(a)}),s?.event instanceof Object)for(let c in s?.event)l.element[c]=()=>s?.event[c]({state:new H({Getter(h,w){return h[w]},Setter(h,w,k){for(let m of i[w])m.state[w]=k,m.updateTextNode()}}).setReactive(a)});for(let c of Object.keys(l.state))i[c]instanceof Array||(i[c]=[]),i[c].push(l);t.push(l)}let r={};for(let s of t)s.updateTextNode(),r[s.position]?r[s.position].appendChild(s.element):(r[s.position]=s.element,r[s.parent]&&r[s.parent].appendChild(s.element));return e instanceof HTMLElement&&e.appendChild(r[Object.keys(r)[0]]),{destroy:t[0].destroy,component:t[0],state:new H({Getter(s,l){return s[l]},Setter(s,l,c){for(let h of i[l])h.state[l]=c,h.updateTextNode()}}).setReactive(a),updateComponentRendered(){for(let s of t)s.updateTextNode()}}}replaceChild(o,e){e.parentElement.replaceChild(o.element,e)}findById(o){return this.#allComponentId[o]}};var u=new G;function V(o){return u.findById(o)}function A(o,e,n){return{...u.renderComponent(o,e,n),updateComponentProperty(t,a){let i=u.renderComponent(t(a),void 0,n);u.replaceChild(i.component,this.component.element)}}}var se=class{#e=[];#t=null;constructor(){window.addEventListener("DOMContentLoaded",()=>{document.body.onclick=e=>{e.target.matches("[data-link]")&&(e.preventDefault(),this.navigateTo(e.target.href))}}),window.onpopstate=()=>{this.render()}}navigateTo(e){history.pushState(null,null,e),this.render()}addNewRouter(e,n){this.#e.push({path:e,event:n,isMatch:!1})}matchRoute(e){return location.pathname===e}updateRouteHandler(){let e=this.matchRoute;this.#e=this.#e.map(n=>({path:n.path,event:n.event,isMatch:e(n.path)}))}render(){this.updateRouteHandler();let e=this.#e.find(n=>n.isMatch);e||(e={path:location.pathname,event:()=>{console.log("page not found")},isMatch:!0}),this.#t instanceof Object?(this.#t.destroy(),this.#t=e.event()):this.#t=e.event()}routeTo(e,n){this.addNewRouter(e,n)}},E={SPA:new se,route({path:o,component:e,data:n={},target:t=()=>{},onrender:a=()=>{}}){this.SPA.routeTo(o,()=>{let i=A(e,t(),n);return a(i),i}),this.SPA.render()}};function I({parentcomponent:o,positioncomponent:e,$class:n,$id:t=0}){return[u.createRawComponent("div",{content:"``",parentComponent:o,positionComponent:e,state:{},event:{},attribute:{class:n+" smc-card"},id:""})]}function U({parentcomponent:o,positioncomponent:e,$class:n,$id:t=0}){return[u.createRawComponent("div",{content:"`                            `",parentComponent:o,positionComponent:e,state:{},event:{},attribute:{class:n+" smc-chips smc-ripple"},id:""}),u.createRawComponent("div",{content:"``",parentComponent:e,positionComponent:"6000878540004060a200197000000909"+t,state:{},event:{},attribute:{class:"ripple"},id:""})]}function X(){try{Array.from(document.querySelectorAll(".smc-ripple")).forEach(e=>{let n;e.addEventListener("mousedown",t=>{clearTimeout(n);let a=e.querySelector(".ripple"),i=e.offsetWidth,r=e.getBoundingClientRect(),s=t.pageX-r.left-i,l=t.pageY-r.top-i-window.scrollY;a.style="top:"+l+"px; left:"+s+"px; width: "+i*2+"px; height: "+i*2+"px;",a.classList?.remove("active"),a.classList?.remove("start"),setTimeout(()=>{a.classList?.add("start"),setTimeout(()=>{a.classList?.add("active")})})}),e.addEventListener("mouseup",t=>{let a=e.querySelector(".ripple");clearTimeout(n),n=setTimeout(()=>{a.classList?.remove("active"),a.classList?.remove("start")},500)})})}catch{}}function T({parentcomponent:o,positioncomponent:e}){return[u.createRawComponent("div",{content:"`                            `",parentComponent:o,positionComponent:e,state:{},event:{},attribute:{class:"navbar"},id:""}),u.createRawComponent("div",{content:"`                                                                                                                    `",parentComponent:e,positionComponent:"15590058101048208081120060903688",state:{},event:{},attribute:{class:"action"},id:""}),u.createRawComponent("a",{content:"`                        Home                    `",parentComponent:"15590058101048208081120060903688",positionComponent:"40020505801740328300550000002640",state:{},event:{},attribute:{href:"/","data-link":""},id:""}),u.createRawComponent("a",{content:"`                        Docs                    `",parentComponent:"15590058101048208081120060903688",positionComponent:"1484940813404547b230138010703109",state:{},event:{},attribute:{href:"/docs","data-link":""},id:""}),u.createRawComponent("a",{content:"`                        API                    `",parentComponent:"15590058101048208081120060903688",positionComponent:"41407005180040608059540940900000",state:{},event:{},attribute:{href:"/api","data-link":""},id:""}),u.createRawComponent("a",{content:"`                        Config                    `",parentComponent:"15590058101048208081120060903688",positionComponent:"15020855001145019078184007443305",state:{},event:{},attribute:{href:"/config","data-link":""},id:""}),u.createRawComponent("a",{content:"`Github`",parentComponent:"15590058101048208081120060903688",positionComponent:"5900400617904556a006700034445620",state:{},event:{},attribute:{href:"https://github.com/daberpro/dabCom"},id:""})]}function le({parentcomponent:o,positioncomponent:e}){return[u.createRawComponent("div",{content:"`                                                            `",parentComponent:"",positionComponent:"04104460360440108800804704090860",state:{},event:{},attribute:{class:"main-content"},id:""}),...T({$id:"07225600190448918205110706304800",parentcomponent:"04104460360440108800804704090860",positioncomponent:"46020074804040508001106070017008"}),u.createRawComponent("div",{content:"`                `",parentComponent:"04104460360440108800804704090860",positionComponent:"1000778110004965b045106153106740",state:{},event:{},attribute:{class:"left"},id:"shortContent"}),u.createRawComponent("div",{content:"`                                    `",parentComponent:"04104460360440108800804704090860",positionComponent:"3801587515004007a000725000003805",state:{},event:{},attribute:{class:"right"},id:"allContent"})]}function pe({parentcomponent:o,positioncomponent:e}){return[u.createRawComponent("div",{content:"`                                                            `",parentComponent:"",positionComponent:"10010487204140008001182049013502",state:{},event:{},attribute:{class:"main-content"},id:""}),...T({$id:"95000803684940578007600004027277",parentcomponent:"10010487204140008001182049013502",positioncomponent:"7590000010464058b009820000000550"}),u.createRawComponent("div",{content:"`                `",parentComponent:"10010487204140008001182049013502",positionComponent:"10300000740040659670409089002069",state:{},event:{},attribute:{class:"left"},id:"shortContent"}),u.createRawComponent("div",{content:"`                                    `",parentComponent:"10010487204140008001182049013502",positionComponent:"4002559410304500a050920900046566",state:{},event:{},attribute:{class:"right"},id:"allContent"})]}function ue({parentcomponent:o,positioncomponent:e}){return[u.createRawComponent("div",{content:"`                                                            `",parentComponent:"",positionComponent:"1900063619944192a024100602050070",state:{},event:{},attribute:{class:"main-content"},id:""}),...T({$id:"10075100100546408750314000854996",parentcomponent:"1900063619944192a024100602050070",positioncomponent:"14036016505340908048401072007771"}),u.createRawComponent("div",{content:"`                `",parentComponent:"1900063619944192a024100602050070",positionComponent:"10260754003942888008100590702340",state:{},event:{},attribute:{class:"left"},id:"shortContent"}),u.createRawComponent("div",{content:"`                                    `",parentComponent:"1900063619944192a024100602050070",positionComponent:"04230000100640598003150045007470",state:{},event:{},attribute:{class:"right"},id:"allContent"})]}var ce=`# # Hello From Seleku\r
this site create by seleku-kit and create by daberdev it self\r
\r
## # Apa itu seleku ?\r
seleku adalah framework front end javascript yang berfokus kepada component dan pengembangan web3\r
framework ini cukup simpel dan di tenagai oleh esbuild sebagai bundler nya\r
\r
## # kenapa seleku ?\r
seleku memungkinkan anda untuk melakukan pembuatan component dari element html yang di tulis langsung\r
di dalam sintaks javascript dan beberapa fitur lainya yang memungkinkan anda melakukan development\r
khusus bagian frontend web, selain itu seleku di buat dengan sangat simpel dan seleku berjalan dengan dabcom library yang merupakan library utama dari seleku core system\r
\r
# # Getting Started\r
## # instalasi dan requirement\r
untuk menggunakan seleku-kit ada terlebih dahulu harus telah memahami dasar dari web development seperti\r
**html**,**css**,**javascript** dan pemahaman tentang node js dan npm (node package manager)\r
\r
#### setup node js\r
jika anda belum memiliki node js maka anda dapat mendownload di **[Download Node JS](https://nodejs.org)** setelah mendownload silahkan ikuti instruksi instalasi yang di berikan kemudian\r
silahkan lakukan pengecekan apakah node js telah terinstall di lokal komputer anda dengan mengetikan\r
\r
\`\`\`bash\r
node --version\r
\`\`\`\r
\r
jika node js telah terinstall maka anda dapat melihat versi dari node js yang telah di install, jika anda\r
telah menginstall node js maka anda juga akan secara otomatis menginstall npm (node package manager) yang akan kita gunakan untuk memanajement project seleku-kit maupun project javascript lainya\r
\r
untuk melihat versi npm jalankan perintah :\r
\r
\`\`\`bash\r
npm --version\r
\`\`\`\r
\r
kemudian untuk menginstall seleku template generator anda cukup menjalan kan perintah berikut\r
\r
\`\`\`bash\r
npm i seleku-kit -g\r
\`\`\`\r
\r
maka seleku akan di install secara global di komputer anda\r
\r
## # Membuat Project Pertama\r
untuk membuat project pertama silahkan jalan kan \`seleku-kit\` di terminal atau command prompt anda maka\r
anda akan di minta untuk memilih template apa yang akan anda gunakan\r
kemudian anda akan di minta untuk memasukan nama project baru yang akan anda buat\r
\r
setelah anda membuat template project silahkan jalankan terminal atau command prompt anda di dalam folder\r
project yang telah anda buat dengan mengetikan \`npm i\` kemudian anda jalankan \`npm run dev\` untuk menjalankan seleku-kit di mode development dan anda akan melihat bahwa seleku berjalan di lokal komputer anda dengan port default bawaan\r
\r
silahkan buka di web browser anda dan untuk melihat perubahan silahkan anda edit file\r
\`main.selek\`\r
\r
# # Sintaks Dasar\r
Seleku-kit memiliki sintaks yang merupakan gabungan dari HTML dan js sehingga bagi anda yang menggunakan react\r
maka anda akan merasa familiar dengan sintaks yang ada untuk memulai mari kita pahami susunan sintaks\r
\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
\r
Render(<h1>Hello World</h1>,document.body);\r
\r
\`\`\`\r
#### # Dasar - Dasar\r
- pada bagian awal kita mengimport **dabMain** dan **Render**, \r
apa itu dab main?, **dabMain** merupakan suatu Object yang memuat semua method dan property yang akan di butuhkan untuk membuat suatu component, \r
sedangkan **Render** merupakan fungsi yang bertugas untuk menampilkan component ke layar dengan cara memasukan component ke tag HTML yang di targetkan\r
\r
- pada baris ke 3 kita menggunakan fungsi **Render** dengan parameter pertama merupakan component yang akan di render dan parameter ke dua merupakan target atau tempat di rampilkan nya component\r
\r
## # Comment\r
untuk membuat komentar di dalam seleku cukup gunakan /**/ atau multi-line comment\r
yang ada di javascript\r
\r
\`\`\`jsx\r
/*ini contoh komentar*/\r
\`\`\`\r
\r
## # Template Literal\r
selek-kit menggunakan template literal bawaan javascript untuk menampilkan\r
suatu kontent text di dalam html\r
\r
##### contoh template literal\r
\`\`\`jsx\r
\r
    const seleku = "i am seleku-kit";\r
\r
    <h1> hello \${seleku}</h1>;\r
\r
\`\`\`\r
\r
#### # function component\r
seleku-kit memungkinkan anda untuk membuat component dari suatu fungsi sebagai berikut\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
function Welcome(){\r
\r
    return <h1>Welcome to seleku-kit!!</h1>;\r
\r
}\r
\r
Render(<Welcome><Welcome/>,document.body);\r
\r
\`\`\`\r
\r
untuk menerima argument dari function component lakukan sebagai berikut\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
function Welcome({username}){\r
\r
    return <h1 state="{{username}}">\r
        Welcome to seleku-kit!! \${this.state.username}\r
    </h1>;\r
\r
}\r
\r
Render(<Welcome username="'Daberdev'"><Welcome/>,document.body);\r
\r
\`\`\`\r
\r
ketika suatu function component menerima argument maka ketika component tersebut di panggil untuk memasukan argumen nya cukup lakukan sperti memasukan attribute di html biasa, untuk saat ini abaikan attribute state dan penggunaan template literal yang ada pada kode tersebut\r
\r
> pemberitahuan setiap attribute yang di miliki suatu component akan memiliki value yang di anggap javascript biasa oleh karena itu untuk memasukan suatu string ke dalam attribute gunakan \`\` atau ''\r
\r
\r
## # Attribute Spesial\r
component di seleku memiliki atribut-atribut khusus maupun umum di antara nya sebagai berikut\r
\r
## # $toBeChild \r
attribute **$toBeChild** merupakan attribute yang di gunakan di dalam parameter suatu funsi component\r
attribute ini di gunakan untuk memberikan component yang ada di dalam function componentid dari parent component nya agar bisa di gunakan sebagai target untuk component yang ada di dalam function component di render\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
function Welcome({$toBeChild}){\r
\r
    return <h1>\r
        Welcome to seleku-kit!! \r
    </h1>;\r
\r
}\r
\r
Render(<div><Welcome username="'Daberdev'"><Welcome/></div>,document.body);\r
\r
\`\`\`\r
\r
## # $beChild \r
attribute **$beChild** merupakan attribute yang berpasangan dengan attribute **$toBeChild** jika **$toBeChild** hanya memberikan semua properti untuk di gunakan kepada component yang ada di dalam function component maka **$beChild** adalah attribute yang menerima semua properti tersebut untuk kemudian di gunakan oleh component di dalam function component me render\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
function Welcome({$toBeChild}){\r
\r
    return <h1 $beChild>\r
        Welcome to seleku-kit!! \r
    </h1>;\r
\r
}\r
\r
Render(<div><Welcome username="'Daberdev'"><Welcome/></div>,document.body);\r
\r
\`\`\`\r
\r
## # $loopComponent \r
attribute ini merupakan attribute yang hanya di miliki oleh component yang melakukan looping baik di dalam for loop maupun while bahkan array method sekalipun\r
\r
\`\`\`jsx\r
\r
async function AllContributor({$toBeChild}){\r
\r
    let loopingComponent = [];\r
\r
    const data = await (await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();\r
\r
    for (let x of data){\r
\r
        loopingComponent = [\r
            ...loopingComponent,\r
            ...<img \r
            $loopComponent="x.node_id"\r
            title="x.login" \r
            src="x.avatar_url"/>];\r
\r
    }\r
\r
    return loopingComponent;\r
\r
}\r
\r
(async ()=> Render(<div><AllContributor $async></AllContributor></div>))();\r
\r
\`\`\`\r
attribute ini membutuhkan value yang merupakan id yang unik\r
\r
## # component:id\r
ini merupakan attribute yang berfungsi sebagai id dari suatu component\r
> id yang di definiksan dengan id component berbeda dengan id dari HTML\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
const card = <div component:id="example_id"></div>;\r
\r
Render(card,document.body);\r
\r
\`\`\`\r
\r
dan perlu di ingat bahwa **component:id** hanya di miliki oleh component dari HTML bukan dari function\r
component\r
\r
## # state\r
attribute ini merupakan attribute khusus dan hanya di miliki oleh component dari tag HTML dan bukan dari component function, attribute ini di gunakan untuk memasukan data dinamis yang dapat di ubah-ubah sesuai dengan kebutuhan anda dan untuk data yang di masukan harus dalam bentuk object {{}} kurung kurawal bagian luar merupakan kurung kurawal yang di gunakan untuk memberitahukan kepada kompiler bahwa kode yang terdapat di dalam kurung kurawal pertama akan di eksekusi di sisi kompiler terlebih dahulu agar tidak di anggap sebagai string oleh compiler\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render } from "dabcom";\r
\r
function Card(){\r
\r
    return  <div>\r
                <h1>Hello</h1>\r
                <p state="{{\r
                    count: 0\r
                }}">count \${this.state.count}</p>\r
            </div>;\r
\r
}\r
\r
Render(<Card></Card>,document.body);\r
\r
\`\`\`\r
\r
untuk melakukan update pada state anda harus menggunakan fungsi **findById** yang terdapat di dalam dabcom perlu di ketahui bahwa fungsi **findById** adalah fungsi yang memutuhkan id dari suatu component\r
id dari component berbeda dengan id dari HTML\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render, findById } from "dabcom";\r
\r
function Card(){\r
\r
    return  <div>\r
                <h1>Hello</h1>\r
                <p component:id="counting" state="{{\r
                    count: 0\r
                }}">count \${this.state.count}</p>\r
            </div>;\r
\r
}\r
\r
window.setInterval(()=>{\r
\r
    findById("counting").state.count++;\r
\r
},1000);\r
\r
Render(<Card></Card>,document.body);\r
\r
\`\`\`\r
\r
## # on:\r
attribute ini merupakan attribute spesial yang hanya di miliki oleh component dari tag HTML dan bukan dari function component, attribute ini di gunakan untuk membuat event pada component HTML yang di render dan untuk menggunakan cukup dengan \`on:nama-event\` contoh \`on:click\` dan untuk value dari attribute ini berupa function seperti berikut \`on:click="{()=>{}}"\` seleku-kit mengharuskan untuk menggunakan arrow function di dalam attribute on agar tidak terjadi error pada compiler di karena aturan kurung kurawal pertama seperti yang terdapat pada attribute state\r
\r
\`\`\`jsx\r
\r
import { dabMain, Render, findById } from "dabcom";\r
\r
function Card(){\r
\r
    return  <div>\r
                <h1 on:click="{()=>{\r
\r
                    alert('hello world');\r
\r
                }}">Hello</h1>\r
            </div>;\r
\r
}\r
\r
Render(<Card></Card>,document.body);\r
\r
\`\`\`\r
\r
## # $async\r
attribute ini hanya di miliki oleh component function dan di gunakan untuk\r
me render async component function dan parent atau component induk dari\r
async component function harus merupakan fungsi async\r
\r
### contoh\r
\r
\`\`\`jsx\r
\r
async function AllContributor({$toBeChild}){\r
\r
    let loopingComponent = [];\r
\r
    const data = await (await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();\r
\r
    for (let x of data){\r
\r
        loopingComponent = [\r
            ...loopingComponent,\r
            ...<img \r
            $loopComponent="x.node_id"\r
            title="x.login" \r
            src="x.avatar_url"/>];\r
\r
    }\r
\r
    return loopingComponent;\r
\r
}\r
\r
const App = async ()=>{\r
    Render(<div><AllContributor $async></AllContributor></div>))();\r
}\r
\r
App();\r
\r
\`\`\`\r
\r
# # Seleku Routing\r
seleku-kit memiliki sistem routing menggunakan SPA (single page application) bawaan yang dapat anda gunakan\r
dengan mudah untuk contoh kodenya sebagai berikut\r
\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
import { Router } from "dabcom/spa/route.js";\r
\r
function Home(){\r
\r
    return <h1>Hello World!!</h1>;\r
\r
}\r
\r
<Router.route \r
\r
    path="'/home'"\r
    component="<Home></Home>"\r
    target="{()=>{\r
        \r
        return document.body;\r
\r
    }}"\r
    onRender="{()=>{\r
\r
        console.log('your in home page');\r
\r
    }}"\r
\r
></Router.route>;\r
\r
\`\`\`\r
berikut adalah penjelasan sintaks di atas \r
- **Router.route** merupakan suatu fungsi yang di ambil dari dabcom library\r
- argumen **path** merupakan argument yang di butuhkan oleh router untuk menentukan url bagi component untuk di render\r
- argument **component** merupakan argument yang menerima component yang akan di render\r
- argument **target** argument ini di gunakan untuk menerima element / component HTML yang akan menjadi tempat render\r
- argument **onRender** yaitu argument yang menerima callback function ketika component di render\r
\r
## # mengirim data\r
untuk mengirimkan data ke dalam router anda cukup menggunakan attribute data\r
dan untuk mengakses data yang di kirim cukup gunakan this di ikuti dengan nama property dari data yang di kirim\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
import { Router } from "dabcom/spa/route.js";\r
\r
function Home(){\r
\r
    return <h1>Hello \${this.user}!!</h1>;\r
\r
}\r
\r
<Router.route \r
\r
    path="'/home'"\r
    component="<Home></Home>"\r
    target="{()=>{\r
        \r
        return document.body;\r
\r
    }}"\r
    onRender="{()=>{\r
\r
        console.log('your in home page');\r
\r
    }}"\r
\r
    data = "{{\r
        user: 'daber'\r
    }}"\r
\r
></Router.route>;\r
\r
\`\`\`\r
untuk melakukan pemindahan url gunakan element a href di ikuti dengan attribute\r
**data-link**\r
\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
import { Router } from "dabcom/spa/route.js";\r
\r
function Home(){\r
\r
    return <h1>\r
        Hello \${this.user}!!\r
        <a href="'/about'" data-link>to About</a>\r
    </h1>\r
\r
}\r
\r
function About(){\r
\r
    return <h1>\r
        i create by seleku-kit\r
        <a href="'/home'" data-link>to Home</a>\r
    </h1>\r
\r
}\r
\r
<Router.route \r
\r
    path="'/home'"\r
    component="<Home></Home>"\r
    target="{()=>{\r
        \r
        return document.body;\r
\r
    }}"\r
    onRender="{()=>{\r
\r
        console.log('your in home page');\r
\r
    }}"\r
\r
    data = "{{\r
        user: 'daber'\r
    }}"\r
\r
></Router.route>;\r
\r
<Router.route \r
\r
    path="'/about'"\r
    component="<About></About>"\r
    target="{()=>{\r
        \r
        return document.body;\r
\r
    }}"\r
    onRender="{()=>{\r
\r
        console.log('your in home page');\r
\r
    }}"\r
></Router.route>;\r
\r
\`\`\`\r
\r
# # Loop Component\r
seleku juga memungkinkan anda untuk melakukan loop pada component pada bagian\r
attribute **$loopComponent** anda telah melihat bahwa seleku-kit memiliki attribute tersebut yang harus di gunakan pada saat anda melakukan\r
looping pada component baik itu menggunakan for ataupun while bahkan \r
array method sekalipun\r
\r
## # Loop example\r
seleku-kit sebenarnya melakukan compile yaitu mentransformasi sintaks dari .selek\r
ke .js sehingga suatu component baik itu function component maupun HTML component\r
akan di ubah menjadi sintaks javascript yang merupakan suatu array ataupun mengembalikan suatu array oleh karena itu ketika anda melakukan looping \r
di haruskan untuk mengurai array yang di bentuk oleh compiler kemudian di push\r
ke dalam array yang baru\r
\r
### # Contoh For Loop\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
\r
const allFruits = ["grape","apple","strawberry","pinapple"];\r
\r
function FruitsName(){\r
\r
    let newCompoonent = [];\r
\r
    for(let x in allFruits){\r
        /*ingat anda harus mengisikan id yang unik untuk loop component*/\r
        newComponent = [\r
            ...newComponent,\r
            ...<h1 $loopComponent="x" state="{{content: allFruits[x]}}">\r
                \${this.state.content}\r
               </h1>\r
        ];\r
\r
    }\r
\r
    /*anda harus mengembalikan array dari component yang baru*/\r
\r
    return newComponent;\r
\r
}\r
\r
\`\`\`\r
\r
untuk contoh lainya anda dapat melakukan penerapan yang sama baik pada while maupun\r
array method\r
\r
# # Render\r
sejauh ini kita sering melihat fungsi **Render** di hampir setiap contoh kode\r
dan telah di jelaskan di beberapa sub-docs bahwa fungsi ini merupakan fungsi\r
yang di tugaskan untuk me render tetapi apakah hanya untuk me render static?, tentu tidak fungsi ini juga dapat melakukan update render dan melakukan pengiriman\r
data ke dalam component yang di render\r
\r
### Contoh Kode\r
\r
## # Render Update\r
\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
\r
function SayHello({gender}){\r
\r
    if(gender === "male"){\r
\r
        return <h1>Hello mr</h1>\r
\r
    }\r
\r
    if(gender === "female"){\r
\r
        return <h1>Hello mrs</h1>\r
\r
    }\r
\r
}\r
\r
const say = Render(<SayHello gender="'male'"></SayHello>,document.body);\r
\r
say.updateComponentProperty(SayHello,{\r
    gender: "female"\r
});\r
\r
\`\`\`\r
fungsi **Render** akan mengembalikan suatu fungsi **updateComponentProperty** di mana\r
fungsi ini akan melakukan update terhadap render dengan properti yang di terima\r
untuk parameter pertama pada fungsi ini yaitu component function dan paramter ke 2\r
merupakan properti yang akan anda update\r
\r
## # Embbed Data\r
\r
seperti yang telah di beritahukan bahwa fungsi **Render** dapat melakukan pengiriman data yang akan di embbed ke dalam component dan untuk mengakses nya\r
cukup gunakan this di ikuti dengan nama property yang di embbed\r
\r
\`\`\`jsx\r
import { dabMain, Render } from "dabcom";\r
\r
function SayHello({gender}){\r
\r
    if(gender === "male"){\r
\r
        return <h1>Hello mr \${this.username}</h1>\r
\r
    }\r
\r
    if(gender === "female"){\r
\r
        return <h1>Hello mrs \${this.username}</h1>\r
\r
    }\r
\r
}\r
\r
const say = Render(<SayHello gender="'male'"></SayHello>,\r
            document.body,\r
            {\r
                username: "\`nanda\`"\r
            });\r
\r
say.updateComponentProperty(SayHello,{\r
    gender: "female"\r
});\r
\r
\`\`\`\r
tapi perlu di ingat bahwa embbed data ini merupakan data statis bukan data dinamis\r
\r
# # Whats Next ?\r
untuk saat ini seleku masih dalam tahap pengembangan dan akan terus di lakukan\r
update untuk selanjutnya seleku akan memiliki fitur web3 yang saat ini sedang di development `;var me=`# All API\r
## # Render\r
**\`Render : Function\`**\r
\r
\`\`\`ts\r
Render(component: Component, target: HTMLElement, embbedData: Object)\r
\`\`\`\r
\r
|Argument | Description |\r
|:--------|:-----------|\r
|component|komponent yang akan di render bisa berupa component function atau component HTML|\r
|target| HTMLElement yang akan menjadi tempat di render nya component|\r
|embbedData| merupakan data bertipe object yang akan di masukan ke dalam component|\r
\r
| Method      | Description |\r
| :----------- | :----------- |\r
| updateComponentProperty| melakukan update pada component yang di render |\r
\`\`\`ts\r
Render(component: Component, target: HTMLElement, embbedData: Object).updateComponentProperty(componentFunction: ComponentFunctiom,data: Object);\r
\`\`\`\r
\r
## # findById\r
**\`findById : Function\`**\r
\r
\`\`\`ts\r
findById(componentId: String)\r
\`\`\`\r
\r
|Argument | Description |\r
|:--------|:-----------|\r
|componentId|component:id dari suatu component|\r
\r
## # Router\r
**\`Router : Object\`**\r
\r
\`\`\`ts\r
Router\r
\`\`\`\r
\r
| Method      | Description |\r
| :----------- | :----------- |\r
| route| melakukan routing|\r
\r
\`\`\`ts\r
Router.route(Object: {path: String,target: Function,component: Component,data: Object})\r
\`\`\``;var de="# Config\r\nseleku menggunakan esbuild sebagai bundler nya untuk melakukan config maka\r\nanda cukup melakukan pengautran pada file `esbuild.config.json` atau `build.config.json` untuk mendapatkan configurasi silahkan kunjungi web resmi esbuild\r\n**[Esbuild Config](https://esbuild.github.io/getting-started/)**";async function Le({parentcomponent:o,positioncomponent:e}){let n=[],t=await(await fetch("https://api.github.com/repos/daberpro/dabcom/contributors")).json();for(let a of t)n=[...n,u.createRawComponent("img",{content:"``",parentComponent:o,positionComponent:"1510180070284959a008100206100333"+a.node_id,state:{},event:{},attribute:{title:a.login,src:a.avatar_url},id:""})];return n}async function Be(){return[u.createRawComponent("div",{content:"`                                                                                                            `",parentComponent:"",positionComponent:"9003108200904500a402701480064097",state:{},event:{},attribute:{class:"hero"},id:""}),...T({$id:"00090020162042008000206009000800",parentcomponent:"9003108200904500a402701480064097",positioncomponent:"10010900602040308076187800709090"}),...I({$id:"19154010164140068007561066980003",$class:"main-panel",parentcomponent:"9003108200904500a402701480064097",positioncomponent:"6682232022344001a800800090686094"}),u.createRawComponent("h1",{content:"`                        # Seleku-kit                    `",parentComponent:"6682232022344001a800800090686094",positionComponent:"35089024168441008094090120434680",state:{},event:{},attribute:{},id:""}),u.createRawComponent("p",{content:"`                        simplify to make the web fast without leaving javascript to write HTML                    `",parentComponent:"6682232022344001a800800090686094",positionComponent:"1240093330004080b203880050460950",state:{},event:{},attribute:{},id:""}),...U({$id:"11740400109446318009730077080300",parentcomponent:"6682232022344001a800800090686094",positioncomponent:"47001030112048008077109240039073"}),u.createRawComponent("i",{content:"``",parentComponent:"47001030112048008077109240039073",positionComponent:"90020005803540539003370305900000",state:{},event:{},attribute:{class:"fas fa-arrow-down"},id:""}),u.createRawComponent("span",{content:"`Read More..`",parentComponent:"47001030112048008077109240039073",positionComponent:"10086670544049308000774002401546",state:{},event:{},attribute:{},id:""}),u.createRawComponent("div",{content:"`                                    `",parentComponent:"9003108200904500a402701480064097",positionComponent:"94054440020844088159100300561708",state:{},event:{},attribute:{class:"saparator"},id:""}),...U({$id:"9070050950214301a010160504009066",parentcomponent:"94054440020844088159100300561708",positioncomponent:"44556090165440178830199631074051"}),u.createRawComponent("h2",{content:"`                            Seleku-kit feature                        `",parentComponent:"44556090165440178830199631074051",positionComponent:"90800060502643068480100504400046",state:{},event:{},attribute:{},id:""}),u.createRawComponent("div",{content:"`                                                                            `",parentComponent:"9003108200904500a402701480064097",positionComponent:"12042074106546028696834580000000",state:{},event:{},attribute:{class:"feature"},id:""}),...I({$id:"11985063156846139580607470053000",$class:"mini-card",parentcomponent:"12042074106546028696834580000000",positioncomponent:"42001019870146608631152107000047"}),u.createRawComponent("h1",{content:"`Reactive`",parentComponent:"42001019870146608631152107000047",positionComponent:"70088018100040758307103084498200",state:{},event:{},attribute:{},id:""}),u.createRawComponent("p",{content:"`                            seleku kit menggunakan reaktivitas untuk melakukan update ui                        `",parentComponent:"42001019870146608631152107000047",positionComponent:"4040740010404000a734200160082000",state:{},event:{},attribute:{},id:""}),...I({$id:"6009072011014080b020190013020201",$class:"mini-card",parentcomponent:"12042074106546028696834580000000",positioncomponent:"13302005200740148020802030800037"}),u.createRawComponent("h1",{content:"`Web3`",parentComponent:"13302005200740148020802030800037",positionComponent:"82100504109240909593801007010009",state:{},event:{},attribute:{},id:""}),u.createRawComponent("p",{content:"`                            fitur utama dari seleku kit adalah web3 frontend, membuat website desentralisasi dengan blockchain                        `",parentComponent:"13302005200740148020802030800037",positionComponent:"17051020110044308062180970700002",state:{},event:{},attribute:{},id:""}),...I({$id:"4106031811304206b034900205203019",$class:"mini-card",parentcomponent:"12042074106546028696834580000000",positioncomponent:"97065609190241828000256000000001"}),u.createRawComponent("h1",{content:"`Metaverse`",parentComponent:"97065609190241828000256000000001",positionComponent:"9600800310004093b400007200700921",state:{},event:{},attribute:{},id:""}),u.createRawComponent("p",{content:"`                            dukungan penuh dalam pengembangan pemrograman berbasis grafis pada web dan memungkinkan pengembangan metaverse                        `",parentComponent:"97065609190241828000256000000001",positionComponent:"6550000010604490b007130500300023",state:{},event:{},attribute:{},id:""}),...I({$id:"50000709110843159401880546000100",$class:"powered",parentcomponent:"9003108200904500a402701480064097",positioncomponent:"70000907105040008309218007122060"}),u.createRawComponent("h1",{content:"`Powered By EsBuild`",parentComponent:"70000907105040008309218007122060",positionComponent:"16053100100840909810699050062880",state:{},event:{},attribute:{},id:""}),u.createRawComponent("p",{content:"`                        seleku kit berjalan diatas esbuild, esbuild sebagai bundler dan memungkinkan developer untuk melakukan banyak hal yang menjadi keterbatasan antara node js dengan frontend                    `",parentComponent:"70000907105040008309218007122060",positionComponent:"10904000128048428611160000091500",state:{},event:{},attribute:{},id:""}),u.createRawComponent("div",{content:"`                                                        `",parentComponent:"9003108200904500a402701480064097",positionComponent:"46370000300448608030540753047009",state:{},event:{},attribute:{class:"contributor"},id:"a"}),u.createRawComponent("h1",{content:"`Contributors`",parentComponent:"46370000300448608030540753047009",positionComponent:"13046085829040108203390067303600",state:{},event:{},attribute:{},id:""}),...await Le({$id:"10207074100240008084632479990400",parentcomponent:"46370000300448608030540753047009",positioncomponent:"20988938122440078062415010308348"})]}async function J(o){let e=V("allContent").element,n=V("shortContent").element,t={},a=null,i=null;if(e instanceof HTMLElement){e.innerHTML=g.parse(o);let s=[...e.children];s=s.filter(l=>l.nodeName.toLowerCase()==="h1"||l.nodeName.toLowerCase()==="h2"||l.nodeName.toLowerCase()==="h4");for(let l of s)l.nodeName.toLowerCase()==="h1"?(t[l.textContent.replace(/\s/igm,"")]=A([u.createRawComponent("details",{content:"``",parentComponent:"",positionComponent:"47900020577045089439502080627040",state:{},event:{},attribute:{class:"tree-nav__item is-expandable"},id:""}),u.createRawComponent("summary",{content:"`${this.state.content}`",parentComponent:"47900020577045089439502080627040",positionComponent:"75002006104048058500840706090112",state:{content:l.textContent},event:{onclick:()=>{l.scrollIntoView()}},attribute:{class:"tree-nav__item-title"},id:""})],n).component.element,a=l.textContent.replace(/\s/igm,""),i=l.nodeName.toLowerCase()):l.nodeName.toLowerCase()==="h2"?(t[l.textContent.replace(/\s/igm,"")]=A([u.createRawComponent("details",{content:"``",parentComponent:"",positionComponent:"10060900178047608967300090010090",state:{},event:{},attribute:{class:"tree-nav__item is-expandable"},id:""}),u.createRawComponent("summary",{content:"`${this.state.content}`",parentComponent:"10060900178047608967300090010090",positionComponent:"19500015130248408009100083700009",state:{content:l.textContent},event:{onclick:()=>{l.scrollIntoView()}},attribute:{class:"tree-nav__item-title"},id:""})],t[a]).component.element,i=l.nodeName.toLowerCase(),i!=="h2"&&(a=l.textContent.replace(/\s/igm,""))):t[l.textContent.replace(/\s/igm,"")]=A([u.createRawComponent("summary",{content:"`${this.state.content}`",parentComponent:"",positionComponent:"3000900980144300a720230443207021",state:{content:l.textContent},event:{onclick:()=>{l.scrollIntoView()}},attribute:{class:"tree-nav__item-title"},id:""})],t[a]).component.element}hljs.highlightAll();let r={contentSelector:".main-content",copyIconClass:"fas fa-copy",checkIconClass:"fas fa-check text-success"};window.highlightJsBadge(r),A([u.createRawComponent("button",{content:"``",parentComponent:"",positionComponent:"83400408105046009400158900903000",state:{},event:{onclick:()=>{n.classList.toggle("show")}},attribute:{class:"panel-btn"},id:""}),u.createRawComponent("i",{content:"``",parentComponent:"83400408105046009400158900903000",positionComponent:"13553096100040088650830006013000",state:{},event:{},attribute:{class:"fas fa-bars"},id:""})],e)}async function He(){E.route({$id:"1034420711704907b047184070900108",path:"/",component:await Be({$id:"09820000101140708080170875020909"}),target:()=>document.body,onrender:()=>{X()}})}He();E.route({$id:"34138307990444018700133607250550",path:"/docs",component:le({$id:"1400369011004460b007107040880607"}),target:()=>document.body,onrender:()=>{J(ce)}});E.route({$id:"40530031600842908628230700083072",path:"/api",component:pe({$id:"80040010202840009505106040006004"}),target:()=>document.body,onrender:()=>{J(me)}});E.route({$id:"80900907808040409617130000390272",path:"/config",component:ue({$id:"80100500755040988626100100077733"}),target:()=>document.body,onrender:()=>{J(de)}});})();
