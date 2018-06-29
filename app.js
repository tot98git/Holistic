const express = require('express');
const pup = require('puppeteer');
const app = express();
const router = express.Router();
var path = require('path');
async function getInfo(url){
    const browser = await pup.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor("body"); 
    try{
         return await page.evaluate(()=>{
            return {
                inputs:[...document.body.querySelectorAll("input")].map((elem)=>{
                    return { 
                        inputName:elem.getAttribute("name"),
                        inputType:elem.getAttribute("type"),
                        inputLabel:()=>{
                            for(var i=0;i<document.body.querySelectorAll("label").length;i++){
                                if(document.body.querySelectorAll("label")[i].getAttribute("for")==elem.getAttribute("id")&&elem.getAttribute("id")!=null){
                                    
                                    return true;break;
                            }
                            else{
                                return null;
                            }
                            }
                        }
                        ,
                        inputAriaLabel:elem.getAttribute("aria-label"),
                        inputAriaChecked:elem.getAttribute("type")=="checkbox"||elem.getAttribute("type")=="radio"?elem.getAttribute("aria-checked"):"na",
                        inputPlaceholder:elem.getAttribute("placeholder"),
                        element:elem
                }
                }),
                img:[...document.body.querySelectorAll("img")].map((elem)=>{
                    element:elem;
                    alt:elem.getAttribute("alt");
                })
            }
            }
        )
    }
    catch(e){
        console.log(e);
    }

}
async function doInTheBackground(url){
    const browser = await pup.launch({headless:false,  
        args: ['--start-fullscreen']
    }); 
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor("body"); 
    
    page.addScriptTag({path:`./scriptToInj.js`});
}
function checkResults(url){
   return getInfo(url).then((res)=>{
        let nameOccurrences=typeOccur=labelOccur=ariaLabelOccur=imgOccur=ariaCheckedOccur=0;
        res.inputs.map((elem)=>{
            elem.inputName==null?nameOccurrences++:"",
            elem.inputType==null?typeOccur++:"",
            elem.inputLabel==null?labelOccur++:"",
            elem.inputAriaLabel==null?ariaLabelOccur++:"",
            elem.inputAriaChecked==null?ariaCheckedOccur++:""
        });
        return res=[
            nameOccurrences,
            typeOccur,
            labelOccur,
            ariaLabelOccur,
            ariaCheckedOccur,
            imgOccur
        ]
    }).then((res)=>{return res});

}
router.get("/data/:url",(req,res)=>{
    checkResults(req.params.url).then((result)=>{res.json(result);});
}
)
router.get("/fix/:url",(req,res)=>{
    doInTheBackground(req.params.url);
})
app.use("/",router);

app.get("/",(req,res)=>{
    doInTheBackground();
})
app.listen(3000);