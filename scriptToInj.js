    [...document.getElementsByTagName('input')].map((elem)=>{
    if(elem.getAttribute('type')=='radio'){
        elem.addEventListener('click',()=>{
            [...elem.parentNode.children].map((elem)=>{
                if(elem.getAttribute("type")=="radio"){
                elem.setAttribute("aria-checked",'false');
                }
            })
            elem.setAttribute('aria-checked','true ');
        })

    }
    if(elem.getAttribute("type")=='text'){
        const prev=elem.previousSibling.previousSibling;
        console.log(prev);
        elem.setAttribute("aria-label",prev.innerHTML);
    }
})
var tagNameArr = ["h1","h2","h3","h4","h5","span"];
[...document.getElementsByTagName('img')].map((element,index)=>{
    console.log(document.getElementsByTagName("img")[index].previousSibling.previousSibling.innerHTML);
element.setAttribute('alt',element.previousSibling.previousSibling!=null?tagNameArr.includes(document.getElementsByTagName("img")[0].previousSibling.previousSibling.tagName.toLowerCase())?element.previousSibling.previousSibling.innerHTML:element.nextSibling!=null?tagNameArr.includes(element.nextSibling.tagName.toLowerCase())?element.nextSibling.innerHTML:null:null:null);
})
