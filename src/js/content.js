console.log("PMP EXAM TRAIN. Translator initialization...")

$( document ).ready(function(){
    $("frame#contentFrame").on("load", function() {
        var iframe= $($("frame#contentFrame")[0].contentWindow.document);
        var head = iframe.find("head");
        var body = iframe.find("body");
        // insert helpbar
        $("<p style='text-align: center; color: white; margin: 2px;'>Scroll down to see translation section</p>").insertAfter(head)
        // insert button
        body.append("<div id='pmp-translator-btn-container' style='margin: 10px auto; width: 100%; height: 40px; display: flex; align-items: center; justify-content: center;'><button style='width: 150px; height: 40px; margin:0 auto; display: flex; align-items: center; justify-content: center;' onCLick='translatePage()'>LOAD TEXT</button></div>")
        // insert logic
        head.append("<script>var loaded=0;function translatePage(){0===loaded&&($.getScript(\"http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit\",function(){console.log(\"PMP EXAM TRAIN. Google Translate has been connected.\")}),loaded=1);var e=\"\",n=!1,t=$(\"svg\");if(t&&t.length)for(var o=0,s=[],l=t.length-1;l>=0;l--){var a=t[l],r=$(a).find(\"text tspan\");if(r&&r.length)for(var i=0;i<r.length;i++)if(r[i]&&r[i].innerHTML&&r[i].childElementCount<1){var g=r[i].innerHTML+\" \",p=\"CHEC&nbsp;MAR&nbsp; \"==g||g.indexOf(\" of 200 \")>0||\"Instructions:&nbsp;Select&nbsp;the&nbsp;best&nbsp;answer&nbsp;then&nbsp;click&nbsp;the&nbsp; \"==g||\"in&nbsp;the&nbsp;bottom&nbsp;right&nbsp;corner&nbsp;to&nbsp;submit. \"==g||\"Correct \"==g||\"Incorrect \"==g;if(!p&&\"M \"!=g){l!=o&&(o=l,e+=\"<br />\",console.log(\"PMP EXAM TRAIN. \"+l+\" === New line\"));var c=!1,b=$(\"div.slide-object.slide-object-shufflegroup\");b&&b.length>0&&$.contains(b[0],a)&&(c=!0),c&&s.length<1&&(e+=\"=========================<br /><br />\",console.log(l+\" === Answers section started\")),console.log(\"PMP EXAM TRAIN. \"+i+\" === \"+g),e+=g.replace(/&nbsp;/g,\" \"),0,c&&!s.includes(l)&&(e+=\"<br />\",console.log(\"PMP EXAM TRAIN. \"+l+\" === Answer line ended\"),s.push(l))}p&&(n=!0)}}if(n){console.log(\" PMP EXAM TRAIN. Question translation...\"),console.log(e);var d=$(\"#translateBox\");d&&d.length>0?d[0].innerHTML=e:$(\"<p id='translateBox' style='z-index: 999; display: block; color:white; text-align: center; width: 95%; margin: 0 auto;'>\"+e+\"</p>\").insertBefore(\"#pmp-translator-btn-container\"),new google.translate.TranslateElement({pageLanguage:\"en\"},\"translateBox\")}else console.log(\"PMP EXAM TRAIN. Only Questions are supported! Cannot translate page\"),alert(\"Only Questions are supported! Cannot translate page\")}</script>")
    });
});