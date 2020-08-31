// should be manually converted to minified script that will be placed on the page
var loaded = 0;
function translatePage(){
    if(loaded === 0){
        $.getScript("http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit", function() {
            console.log("PMP EXAM TRAIN. Google Translate has been connected.");
        });
        loaded = 1;
    }
    var overallText = "";
    var isQuestion = false;
    var svgs = $("svg")
    if (!!svgs && !!svgs.length) {
        var lastNewLine = 0;
        var linesShown = 0;
        var answerLinesPassed = []
        for (var i = svgs.length - 1; i >= 0; i--) {
            var svg = svgs[i]
            var svgtexts = $(svg).find("text tspan");
            if (!!svgtexts && !!svgtexts.length) {
                for (var j = 0; j < svgtexts.length; j++) {
                    if (!!svgtexts[j] && !!svgtexts[j].innerHTML && svgtexts[j].childElementCount < 1){
                        var lineText = svgtexts[j].innerHTML + " ";
                        var isExamQuestionHelpSections = lineText == "CHEC&nbsp;MAR&nbsp; "
                            || lineText.indexOf(" of 200 ") > 0
                            || lineText == "Instructions:&nbsp;Select&nbsp;the&nbsp;best&nbsp;answer&nbsp;then&nbsp;click&nbsp;the&nbsp; "
                            || lineText == "in&nbsp;the&nbsp;bottom&nbsp;right&nbsp;corner&nbsp;to&nbsp;submit. "
                            || lineText == "Correct "
                            || lineText == "Incorrect ";
                        if (!isExamQuestionHelpSections && lineText != "M ") {
                            // Check if line ended - add new line
                            if (i != lastNewLine) {
                                lastNewLine = i;
                                overallText += "<br />"
                                console.log("PMP EXAM TRAIN. " + i + " === New line");
                            }

                            // Check if this is answer line
                            var isAnswerLine = false;
                            var answersBlock = $("div.slide-object.slide-object-shufflegroup");
                            if(!!answersBlock && answersBlock.length > 0){
                                if($.contains(answersBlock[0], svg)){
                                    isAnswerLine = true;
                                }
                            }

                            // Add ====== if this is start of answers for separation.
                            if (isAnswerLine && answerLinesPassed.length < 1) {
                                overallText += "=========================<br /><br />"
                                console.log(i + " === Answers section started");
                            }

                            // Insert text
                            console.log("PMP EXAM TRAIN. " + j + " === " + lineText);
                            overallText += lineText.replace(/&nbsp;/g, " ")
                                .replace("", "f");
                            linesShown++;

                            // Add new line if it is answer line
                            if (isAnswerLine && !answerLinesPassed.includes(i)) {
                                overallText += "<br />"
                                console.log("PMP EXAM TRAIN. " + i + " === Answer line ended");
                                answerLinesPassed.push(i);
                            }
                        }
                        if(isExamQuestionHelpSections) {
                            isQuestion = true;
                        }
                    }
                }
            }
        }
    }
    if(isQuestion){
        console.log(" PMP EXAM TRAIN. Question translation...");
        console.log(overallText);
        var translateBox = $("#translateBox")
        if(!!translateBox && translateBox.length > 0){
            translateBox[0].innerHTML = overallText
        } else {
            $("<p id='translateBox' style='z-index: 999; display: block; color:white; text-align: center; width: 95%; margin: 0 auto;'>" + overallText + "</p>" )
                .insertBefore("#pmp-translator-btn-container");
        }
        new google.translate.TranslateElement({ pageLanguage: 'en' }, 'translateBox');
    } else {
        console.log("PMP EXAM TRAIN. Only Questions are supported! Cannot translate page");
        alert("Only Questions are supported! Cannot translate page")
    }
}