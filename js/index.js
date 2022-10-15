let body = document.getElementsByTagName("body")[0]
let hint = document.getElementById("hint")
let hintContent = document.getElementById("hint-Content")
function hintText(t){
    let newDivBox = document.createElement("div")
    newDivBox.className = "hint"
    newDivBox.style.animation = "hintIn 3s ease 1 forwards"
    body.appendChild(newDivBox)
    let newDiv = document.createElement("div")
    newDiv.className = "hint-Content"
    newDiv.innerText = t
    newDivBox.appendChild(newDiv)
    setTimeout(function(){
        newDivBox.remove()
    },3000)
}
let weekArray = ["天","一","二","三","四","五","六"]
let Htime = document.getElementById("time")
let Hdate = document.getElementById("date")
let Hperiod = document.getElementById("period")
let Hyear = document.getElementById("year")
let timer = setInterval(function(){
    acquisitionTime()
},1000)
function acquisitionTime(){
    let date = new Date()
    let Jdate = ""

    if(date.getMinutes() < "10"){
        Jdate = "0" + date.getMinutes()
    }else{
        Jdate = date.getMinutes()
    }

    Htime.innerText = date.getHours() + " : " + Jdate
    Hdate.innerText = date.getMonth() + 1 + "月" + date.getDate() + "日" 
    Hperiod.innerText = "星期" + weekArray[date.getDay()]
    Hyear.innerText = date.getFullYear() + "年"
}
acquisitionTime()
let searchBtn = document.getElementById("search-Btn")
let searchInput = document.getElementById("search-Input")
let searchEngineSelect = document.getElementById("search-Engine-Select")
let searchEngine = document.getElementById("search-Engine")
let searchEngineUrl = "https://www.baidu.com/baidu?tn=baidu&word="
let searchEngineSelectCard = document.getElementsByClassName("searchEngine-Select-Card")
let searchEngineImg = document.getElementById("searchEngine-Img")
let searchEngineSelectMark = false
searchEngine.onclick = function(){
    if(searchEngineSelectMark){
        searchEngineSelect.style.animation = "searchEngineSelectC 0.3s ease 1 forwards"
        searchEngineSelectMark = false
    }else{
        searchEngineSelect.style.animation = "searchEngineSelectO 0.3s ease 1 forwards"
        searchEngineSelectMark = true
    }
}
for(i=0;i<searchEngineSelectCard.length;i++){
    searchEngineSelectCard[i].onclick = function(){
        searchEngineUrl = this.title
        searchEngineImg.src = this.getElementsByTagName("img")[0].getAttribute("src")
        searchEngineSelect.style.animation = "searchEngineSelectC 0.3s ease 1 forwards"
        searchEngineSelectMark = false
    }
}
searchInput.onkeydown = function(e){
    if(e.key == "Enter"){
        if(searchInput.value != ""){
            window.open(searchEngineUrl + searchInput.value)
        }
    }
}
searchBtn.onclick = function(){
    window.open(searchEngineUrl + searchInput.value)
}
let Pattern = ""
let classificationBox = document.getElementById("classification-Box")
let addClassificationBtn = document.getElementById("add-Classification-Btn")
let addClassification = document.getElementById("add-Classification")
let addClassificationBox = addClassification.getElementsByClassName("add-Classification-Box")[0]
let addClassificationIcon = document.getElementsByClassName("add-Classification-Icon")
let addClassificationName = document.getElementById("add-Classification-Name")
let bookmarkContentBox = document.getElementById("bookmark-Content-Box")
let addClassificationIconData = ""
function OpenAddClassificationInterface(){
    addClassification.style.display = "flex"
    addClassification.style.animation = "opacity1 0.3s ease 1 forwards"
    addClassificationBox.style.animation = "BoxIn1 0.3s ease 1 forwards"

}
function ResetAddClassificationInterface(){
    EmptyAddClassificationIconSelect()
    addClassificationName.value = ""
}
function EmptyAddClassificationIconSelect(){
    for(i=0;i<addClassificationIcon.length;i++){
        addClassificationIcon[i].style.backgroundColor = ""
    }
    addClassificationIconData = ""
}
addClassificationBtn.onclick = function(){
    Pattern = "add"
    OpenAddClassificationInterface()
}
let addClassificationClose = document.getElementById("add-Classification-Close")
addClassificationClose.onclick = function(){
    ResetAddClassificationInterface()
    addClassification.style.animation = "opacity0 0.3s ease 1 forwards"
    addClassificationBox.style.animation = "BoxOut1 0.3s ease 1 forwards"
    setTimeout(function(){
        addClassification.style.display = "none"
    },300)
    Pattern = ""
}
function ClickaddClassificationIcon(obj){
    EmptyAddClassificationIconSelect()
    if(obj.style.backgroundColor != "var(--themeColor)"){
        obj.style.backgroundColor = "var(--themeColor)"
        addClassificationIconData = obj.getElementsByTagName("img")[0].getAttribute('src')
    }
}
for(i=0;i<addClassificationIcon.length;i++){
    let j = i
    addClassificationIcon[i].onclick = function(){
        ClickaddClassificationIcon(addClassificationIcon[j])
    }
}
let addClassificationReset = document.getElementById("add-Classification-Reset")
addClassificationReset.onclick = function(){
    ResetAddClassificationInterface()
}
let addClassificationConfirm = document.getElementById("add-Classification-Confirm")
addClassificationConfirm.onclick = function(){
    if(addClassificationName.value == ""){
        hintText("请填写路径")
    }else{
        if(addClassificationIconData == ""){
            hintText("请选择图标")
        }else{
            if(Pattern == "add"){
                let temporaryArr = {sidebar:{name:"",icon:""},content:[]}
                temporaryArr.sidebar.name = addClassificationName.value
                temporaryArr.sidebar.icon = addClassificationIconData
                bookmarks.push(temporaryArr)
                localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                AddClassificationAndBookmarkContentFun(addClassificationIconData,addClassificationName.value)
            }
            if(Pattern == "compile"){
                bookmarks[compileclassificationIndex].sidebar.name = addClassificationName.value
                bookmarks[compileclassificationIndex].sidebar.icon = addClassificationIconData
                localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                classification[compileclassificationIndex].getElementsByTagName("img")[0].src = addClassificationIconData
                classification[compileclassificationIndex].getElementsByClassName("classification-Name")[0].innerText = addClassificationName.value
            }
            ResetAddClassificationInterface()
            addClassification.style.animation = "opacity0 0.3s ease 1 forwards"
            addClassificationBox.style.animation = "BoxOut1 0.3s ease 1 forwards"
            setTimeout(function(){
                addClassification.style.display = "none"
            },300)
            Pattern = ""
            compileclassificationIndex = ""
        }
    }
}
let addClassificationAddIcon = document.getElementById("add-Classification-AddIcon")
let AddIconMark = ""
let AddIconBox = document.getElementById("AddIcon-Box")
let AddIconHeadline = document.getElementById("AddIcon-Headline")
let AddIconUrlBoxText = document.getElementById("AddIcon-UrlBox-Text")
let AddIconInput = document.getElementById("AddIcon-Input")
let iconPreviewText = document.getElementById("icon-Preview-Text")
let iconPreviewIcon = document.getElementById("icon-Preview-Icon")
let AddIconConfirm = document.getElementById("AddIcon-Confirm")
let addClassificationIconGrid = document.getElementsByClassName("add-Classification-IconGrid")[0]
AddIconInput.oninput = function(){
    iconPreviewIcon.src = AddIconInput.value
}
function OpenAddIconBoxInterface(){
    AddIconBox.style.display = "flex"
    AddIconBox.style.animation = "opacity1 0.3s ease 1 forwards"
}
function CloseAddIconBoxInterface(){
    AddIconBox.style.animation = "opacity0 0.3s ease 1 forwards"
    setTimeout(function(){
        AddIconBox.style.display = "none"
    },300)
}
addClassificationAddIcon.onclick = function(){
    OpenAddIconBoxInterface()
    AddIconHeadline.innerText = "新增侧边栏图标"
    AddIconUrlBoxText.innerText = "网络图标地址"
    iconPreviewText.innerText = "图标预览"
    iconPreviewIcon.style.width = "90px"
    AddIconMark = "侧边栏图标"
}
function AddIconFun(src){
    let newDiv = document.createElement("div")
    newDiv.className = "add-Classification-Icon"
    newDiv.onclick = function(){
        ClickaddClassificationIcon(newDiv)
    }
    addClassificationIconGrid.insertBefore(newDiv,addClassificationAddIcon)
    let newImg = document.createElement("img")
    newImg.className = "add-Classification-Icon-Img"
    newImg.src = src
    newDiv.appendChild(newImg)
}
let iconArr = []
if(!JSON.parse(localStorage.getItem('icon'))){
    localStorage.setItem('icon',JSON.stringify([]))
}
iconArr = JSON.parse(localStorage.getItem('icon'))
for(i=0;i<iconArr.length;i++){
    AddIconFun(iconArr[i])
}
function AddBookmarkIconFun(src){
    let newBookmarkBox = document.createElement("div")
    newBookmarkBox.className = "add-Bookmark-Set-Icon-Box"
    addBookmarkSetIcons.insertBefore(newBookmarkBox,customBookmarkSetIcon)
    let newBookmarkIconBox = document.createElement("div")
    newBookmarkIconBox.className = "add-Bookmark-Set-Icon add-Bookmark-Set-Icon-Onclick"
    newBookmarkBox.appendChild(newBookmarkIconBox)
    newBookmarkIconBox.onclick = function(){
        EmptyBookmarkIconSelectFun()
        this.className = "add-Bookmark-Set-Icon"
        addBookmarkIconMark = "3"
        addBookmarkIconData = src
    }
    let newBookmarkIcon = document.createElement("img")
    newBookmarkIcon.style = "width: 100%;height: 100%;"
    newBookmarkIcon.src = src
    newBookmarkIconBox.appendChild(newBookmarkIcon)
    let newBookmarkText = document.createElement("div")
    newBookmarkText.className = "add-Bookmark-Set-Icon-Text-Box"
    newBookmarkText.innerHTML = "网络图标"
    newBookmarkBox.appendChild(newBookmarkText)
}
let addBookmarkSetIcons = document.getElementsByClassName("add-Bookmark-Set-Icons")[0]
AddIconConfirm.onclick = function(){
    if(AddIconInput.value == ""){
        hintText("请输入url")
    }else{
        if(AddIconMark == "侧边栏图标"){
            AddIconFun(AddIconInput.value)
            iconArr.push(AddIconInput.value)
            localStorage.setItem('icon',JSON.stringify(iconArr))
        }
        if(AddIconMark == "书签图标"){
            AddBookmarkIconFun(AddIconInput.value)
        }
        if(AddIconMark == "背景图片"){
            wallpaperArr.push(AddIconInput.value)
            localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
            addwallpaperFun(AddIconInput.value)
            wallpaper = document.getElementsByClassName("wallpaper")
            WallpaperDataArrInit()
        }
        AddIconInput.value = ""
        iconPreviewIcon.src = ""
        AddIconMark = ""
        CloseAddIconBoxInterface()
    }
}
addClassificationReset.onclick = function(){
    AddIconInput.value = ""
    iconPreviewIcon.src = ""
}
let AddIconClose = document.getElementById("AddIcon-Close")
AddIconClose.onclick = function(){
    AddIconInput.value = ""
    iconPreviewIcon.src = ""
    AddIconMark = ""
    CloseAddIconBoxInterface()
}
function AddClassificationAndBookmarkContentFun(src,name){
    let newClassificationDiv = document.createElement("div")
    newClassificationDiv.className = "classification"
    newClassificationDiv.onclick = function(){
        ClickClassificationFun(newClassificationDiv)
    }
    newClassificationDiv.onmousedown = function(e){
        if(e.button == "2"){
            compileclassificationIndex = InquireIndexFun(this,classification)
            MenuIndex = "classification"
            OpenCompileMenuFun(e.pageX,e.pageY)
        }
    }
    classificationBox.insertBefore(newClassificationDiv,addClassificationBtn)
    let newClassificationImg = document.createElement("img")
    newClassificationImg.className = "classification-Img"
    newClassificationImg.src = src
    newClassificationDiv.appendChild(newClassificationImg)
    let newClassificationName = document.createElement("div")
    newClassificationName.className = "classification-Name"
    newClassificationName.innerText = name
    newClassificationDiv.appendChild(newClassificationName)
    let newBookmarkContentDiv = document.createElement("div")
    newBookmarkContentDiv.className = "bookmark-Content"
    bookmarkContentBox.appendChild(newBookmarkContentDiv)
    let newBookmarkContentAddBtn = document.createElement("div")
    newBookmarkContentAddBtn.className = "bookmark"
    newBookmarkContentAddBtn.innerHTML = '<svg class="bookmark-Img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M821.364 962h-618.75C123.864 962 62 900.114 62 821.364v-618.75c0-78.75 61.864-140.635 140.614-140.635h618.75c78.75 0 140.636 61.885 140.636 140.635v618.75C962 900.114 900.114 962 821.364 962z m79.265-756.814c0-46.586-35.25-81.815-81.815-81.815H205.186c-46.843-0.214-84.557 34.758-83.165 82.393-0.128 14.4 1.35 613.05 1.35 613.05 0 46.565 35.25 81.815 81.815 81.815h613.628c46.565 0 81.815-35.25 81.815-81.815V205.186z m-173.55 347.657H552.843v174.236c0 16.95-13.736 30.685-30.686 30.685h-0.236a30.686 30.686 0 0 1-30.685-30.685V552.843H296.92a30.686 30.686 0 0 1-30.685-30.686v-0.236c0-16.95 13.735-30.685 30.685-30.685h194.315V296.92c0-16.95 13.735-30.685 30.685-30.685h0.236c16.95 0 30.686 13.735 30.686 30.685v194.315h174.236c16.95 0 30.685 13.735 30.685 30.685v0.236c0 16.95-13.735 30.686-30.685 30.686z"></path></svg><div class="bookmark-Name">添加书签</div>'
    newBookmarkContentAddBtn.onclick = function(){
        BookmarkContentAddBtnFun()
        Pattern = "add"
    }
    newBookmarkContentDiv.appendChild(newBookmarkContentAddBtn)
    let newBookmarkContentDeleteBtn = document.createElement("div")
    newBookmarkContentDeleteBtn.className = "bookmark"
    newBookmarkContentDeleteBtn.innerHTML = '<svg class="bookmark-Img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z"></path><path d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539"></path></svg><div class="bookmark-Name">删除书签</div>'
    newBookmarkContentDiv.appendChild(newBookmarkContentDeleteBtn)
    newBookmarkContentDeleteBtn.onclick = function(){
        let bookmarkA = bookmarkContent[clickClassificationindex].getElementsByClassName("bookmark")
        if(this.getElementsByClassName("bookmark-Name")[0].innerText == "编辑完成"){
            for(i=0;i<bookmarkA.length-2;i++){
                bookmarkA[i].onclick = function(){
                    return true
                }
                bookmarkA[i].getElementsByClassName("delete")[0].style.animation = "deleteOut 0.4s ease 1 forwards"
                bookmarkA[i].getElementsByClassName("bookmark-Img")[0].style.animation = ""
            }
            this.innerHTML = '<svg class="bookmark-Img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z"></path><path d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539"></path></svg><div class="bookmark-Name">删除书签</div>'
        }else{
            for(i=0;i<bookmarkA.length-2;i++){
                bookmarkA[i].onclick = function(){
                    return false
                }
            bookmarkA[i].getElementsByClassName("delete")[0].style.animation = "deleteIn 0.4s ease 1 forwards"
            bookmarkA[i].getElementsByClassName("bookmark-Img")[0].style.animation = "delete-bookmark 0.4s linear infinite forwards"
            }
            this.innerHTML = '<svg class="bookmark-Img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M613.648 32a51.388 51.388 0 0 1 34.785 14.908c8.979 9.036 13.665 21.12 12.989 33.488 1.41 24.96-18.92 46.474-45.742 48.338H401.092c-27.388-1.298-48.396-22.927-47.04-48.338-1.356-25.412 19.652-47.098 46.984-48.396h212.611z m232.376 56.47l-0.169 0.17c79.793 0 117.91 45.403 117.91 111.078v650.146c0 79.06-40.716 109.948-124.405 109.948H174.87c-83.915 0-114.07-39.53-114.692-109.948V199.548C60.235 134.042 81.525 88.47 167.812 88.47h108.197c-1.129 5.252-1.693 10.618-1.807 15.982 0 40.66 31.06 80.752 71.548 80.752h326.006c37.722 0 69.515-40.094 69.515-80.752a79.94 79.94 0 0 0-1.638-15.982h106.39zM296.847 550.908l146.71 146.71a37.722 37.722 0 0 0 51.953 0l264.113-263.716a36.536 36.536 0 0 0 0-52.292 36.536 36.536 0 0 0-51.84 0L469.535 619.182 349.252 499.069a36.932 36.932 0 0 0-51.896 0 36.197 36.197 0 0 0-0.566 51.84z" fill="#43b244"></path></svg><div class="bookmark-Name">编辑完成</div>'
        }
    }
}
let addBookmark = document.getElementById("add-Bookmark")
let addBookmarkBox = addBookmark.getElementsByClassName("add-BookmarkBox")[0]
let addBookmarkClose = document.getElementById("add-Bookmark-Close")
let addBookmarkUrl = document.getElementById("add-Bookmark-Url")
let addBookmarkName = document.getElementById("add-Bookmark-Name")
let addBookmarkSetIcon = document.getElementsByClassName("add-Bookmark-Set-Icon")
let textIconInput = document.getElementById("text-Icon-Input")
let textIconContent = document.getElementById("text-Icon-Content")
let bookmarkSetIconFavicon = document.getElementById("bookmark-Set-Icon-Favicon")
let addBookmarkSetImg = document.getElementById("add-Bookmark-Set-Img")
let addBookmarkSetBtnBox = document.getElementById("add-Bookmark-Set-BtnBox")
let textIconBackgroundColorOption = document.getElementById("text-Icon-BackgroundColor").getElementsByClassName("text-Icon-Colour")
let textIconFontColorOption = document.getElementById("text-IconFont-Colour").getElementsByClassName("text-Icon-Colour")
let addBookmarkConfirm = document.getElementById("add-Bookmark-Confirm")
let addBookmarkIconMark = "1"
let addBookmarkTextIconBackgroundColorData = "transparent"
let addBookmarkTextIconFontColorData = "transparent"
let addBookmarkIconData = ""
function OpenAddBookmarkInterface(){
    addBookmark.style.display = "flex"
    addBookmark.style.animation = "opacity1 0.3s ease 1 forwards"
    addBookmarkBox.style.animation = "contentIn 0.3s ease 1 forwards"
}
function EmptyBookmarkIconSelectFun(){
    for(i=0;i<addBookmarkSetIcon.length;i++){
        addBookmarkSetIcon[i].className = "add-Bookmark-Set-Icon add-Bookmark-Set-Icon-Onclick"
        addBookmarkIconMark = ""
    }
}
let addBookmarkSetIconBox = document.getElementsByClassName("add-Bookmark-Set-Icon-Box")
let addBookmarkReset = document.getElementById("add-Bookmark-Reset")
addBookmarkReset.onclick = function(){
    ResetAddBookmarkInterface()
}
function ResetAddBookmarkInterface(){
    addBookmarkUrl.value = ""
    addBookmarkName.value = ""
    textIconInput.value = ""
    textIconContent.style.backgroundColor = addBookmarkTextIconBackgroundColorData = "transparent"
    textIconContent.style.color = addBookmarkTextIconFontColorData = "transparent"
    EmptyBookmarkIconSelectFun()
    textIconContent.className = "add-Bookmark-Set-Icon"
    addBookmarkIconMark = "1"
    bookmarkSetIconFavicon.style.display = "none"
    addBookmarkSetImg.src = ""
    if(addBookmarkSetIcon.length>2){
        for(i=addBookmarkSetIcon.length-1;i>1;i--){
            addBookmarkSetIconBox[i].remove()
        }
    }
    addBookmarkIconData = ""
}
function CloseaddBookmarkCloseFun(){
    ResetAddBookmarkInterface()
    addBookmark.style.animation = "opacity0 0.3s ease 1 forwards"
    addBookmarkBox.style.animation = "contentOut1 0.3s ease 1 forwards"
    setTimeout(function(){
        addBookmark.style.display = "none"
    },300)
    Pattern = ""
}
addBookmarkClose.onclick = function(){
    CloseaddBookmarkCloseFun()
}
addBookmarkSetBtnBox.onclick = function(){
    if(addBookmarkUrl.value == ""){
        hintText("请输入URL")
    }else{
        bookmarkSetIconFavicon.style.display = "flex"
        if(addBookmarkUrl.value.substr(-1) == "/"){
            addBookmarkSetImg.src = addBookmarkUrl.value + "favicon.ico"
        }else{
            addBookmarkSetImg.src = addBookmarkUrl.value + "/favicon.ico"
        }
    }
}
function ClickAddBookmarkSetIconFun(obj,j){
    if(addBookmarkSetIcon.length == "2" && bookmarkSetIconFavicon.style.display != "flex"){
    }else{
        EmptyBookmarkIconSelectFun()
        if(obj.className != "add-Bookmark-Set-Icon"){
            obj.className = "add-Bookmark-Set-Icon"
            if(j == "0"){
                addBookmarkIconMark = "1"
                addBookmarkIconData = ""
            }else{
                if(j == "1"){
                    addBookmarkIconMark = "2"
                }else{
                    addBookmarkIconMark ="3"
                }
                addBookmarkIconData = obj.getElementsByTagName("img")[0].getAttribute("src")
            }
        }
    }
}
for(i=0;i<addBookmarkSetIcon.length;i++){
    let j = i
    addBookmarkSetIcon[i].onclick = function(){
        ClickAddBookmarkSetIconFun(this,j)
    }
}
textIconInput.oninput = function(){
    textIconContent.innerText = this.value
}
for(i=0;i<textIconBackgroundColorOption.length;i++){
    textIconBackgroundColorOption[i].onclick = function(){
        textIconContent.style.backgroundColor = addBookmarkTextIconBackgroundColorData = getComputedStyle(this).backgroundColor
    }
}
for(i=0;i<textIconFontColorOption.length;i++){
    textIconFontColorOption[i].onclick = function(){
        textIconContent.style.color = addBookmarkTextIconFontColorData = getComputedStyle(this).backgroundColor
    }
}
addBookmarkConfirm.onclick = function(){
    if(addBookmarkUrl.value == ""){
        hintText("书签URL不能为空")
    }else{
        if(addBookmarkName.value == ""){
            hintText("书签名称不能为空")
        }else{
            if(addBookmarkIconMark == ""){
                hintText("请选择书签图标")
            }else{
                let temporaryArr = {name:"",url:"",texticon:"",icon:"",mark:""}
                let textIconArr = {text:"",backgroundColor:"",color:""}
                temporaryArr.name = addBookmarkName.value
                temporaryArr.url = addBookmarkUrl.value
                if(addBookmarkIconMark == "1"){
                    textIconArr.text = textIconInput.value
                    textIconArr.backgroundColor = addBookmarkTextIconBackgroundColorData
                    textIconArr.color = addBookmarkTextIconFontColorData
                }
                temporaryArr.texticon = textIconArr
                temporaryArr.icon = addBookmarkIconData
                temporaryArr.mark = addBookmarkIconMark
                if(Pattern == "add"){
                    bookmarks[clickClassificationindex].content.push(temporaryArr)
                    AddNewBookmarkFun(clickClassificationindex,temporaryArr.url,addBookmarkIconMark,textIconArr.backgroundColor,textIconArr.color,textIconArr.text,temporaryArr.icon,temporaryArr.name)
                }
                if(Pattern == "compile"){
                    let bookamrkA = bookmarkContent[clickClassificationindex].getElementsByTagName("a")[compileclassificationIndex]
                    bookamrkA.href = temporaryArr.url
                    bookamrkA.getElementsByClassName("bookmark-Img")[0].remove()
                    if(addBookmarkIconMark == "1"){
                        let newTextIcon = document.createElement("div")
                        newTextIcon.className = "bookmark-Img"
                        newTextIcon.style.backgroundColor = addBookmarkTextIconBackgroundColorData
                        newTextIcon.style.color = addBookmarkTextIconFontColorData
                        bookamrkA.insertBefore(newTextIcon,bookamrkA.getElementsByClassName("bookmark-Name")[0])
                        let newTextIconText = document.createElement("div")
                        newTextIcon.appendChild(newTextIconText)
                        newTextIconText.innerText = textIconInput.value
                    }else{
                        let newBookmarkImg = document.createElement("img")
                        newBookmarkImg.className = "bookmark-Img"
                        newBookmarkImg.src = addBookmarkIconData
                        bookamrkA.insertBefore(newBookmarkImg,bookamrkA.getElementsByClassName("bookmark-Name")[0])
                    }
                    bookamrkA.getElementsByClassName("bookmark-Name").innerText = addBookmarkName.value
                    bookmarks[clickClassificationindex].content[compileclassificationIndex] = temporaryArr
                }
                localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                CloseaddBookmarkCloseFun()
            }
        }
    }
}
function AddNewBookmarkFun(index,url,mark,backgroundColor,color,text,src,name){
    let addBookmarkBtn = bookmarkContent[index].getElementsByClassName("bookmark")
    let newBookmark = document.createElement("a")
    newBookmark.className = "bookmark"
    newBookmark.target = "_blank"
    newBookmark.href = url
    newBookmark.onmousedown = function(e){
        if(e.button == "2"){
            compileclassificationIndex = InquireIndexFun(this,bookmarkContent[clickClassificationindex].getElementsByTagName("a"))
            MenuIndex = "bookmark"
            OpenCompileMenuFun(e.pageX,e.pageY)
        }
    }
    bookmarkContent[index].insertBefore(newBookmark,addBookmarkBtn[addBookmarkBtn.length - 2])
    if(mark == "1"){
        let newBookmarkTextIcon = document.createElement("div")
        newBookmarkTextIcon.className = "bookmark-Img"
        newBookmarkTextIcon.style.backgroundColor = backgroundColor
        newBookmarkTextIcon.style.color = color
        newBookmark.appendChild(newBookmarkTextIcon)
        let newTextDiv = document.createElement("div")
        newTextDiv.innerText = text
        newBookmarkTextIcon.appendChild(newTextDiv)
    }else{
        let newBookmarkImg = document.createElement("img")
        newBookmarkImg.className = "bookmark-Img"
        newBookmarkImg.src = src
        newBookmark.appendChild(newBookmarkImg)
    }
    let newBookmarkName = document.createElement("div")
    newBookmarkName.className = "bookmark-Name"
    newBookmarkName.innerText = name
    newBookmark.appendChild(newBookmarkName)
    let newDelete = document.createElement("img")
    newDelete.className = "delete"
    newDelete.src = "./images/icon/delete.svg"
    newBookmark.appendChild(newDelete)
    newDelete.onclick = function(){
        let bookmarkIndex = bookmarkContent[clickClassificationindex].getElementsByTagName("a")
        let bookmarkMark = InquireIndexFun(this.parentNode,bookmarkIndex)
        bookmarks[clickClassificationindex].content.splice(bookmarkMark,1)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        this.parentNode.remove()
    }
}
let customBookmarkSetIcon = document.getElementById("custom-Bookmark-Set-Icon")
customBookmarkSetIcon.onclick = function(){
    OpenAddIconBoxInterface()
    AddIconHeadline.innerText = "自定义书签图标"
    AddIconUrlBoxText.innerText = "书签图标地址"
    iconPreviewText.innerText = "图标预览"
    iconPreviewIcon.style.width = "90px"
    AddIconMark = "书签图标"
}
let clickClassificationindex = "0"
let clickClassificationMark = "0"
let classification = classificationBox.getElementsByClassName("classification")
let bookmarkContent = document.getElementsByClassName("bookmark-Content")
function ConcealBookmarkContentFun(){
    for(i=0;i<bookmarkContent.length;i++){
        bookmarkContent[i].style.display = "none"
    }
}
function InquireIndexFun(obj,arr){
    for(i=0;i<arr.length;i++){
        if(arr[i] == obj){
            return i
        }
    }
}
function ClickClassificationFun(obj){
    let index = InquireIndexFun(obj,classification)
    clickClassificationindex = index
    ConcealBookmarkContentFun()
    bookmarkContent[index].style.display = "grid"
    if(index<clickClassificationMark){
        bookmarkContent[index].style.animation = "contentIn 0.3s ease forwards"
    }
    if(index>clickClassificationMark){
        bookmarkContent[index].style.animation = "contentOut 0.3s ease forwards"
    }
    clickClassificationMark = index
}
function BookmarkContentAddBtnFun(){
    OpenAddBookmarkInterface()
    Pattern = "add"
}
let bookmarks = [{sidebar:{name:"首页",icon:"./images/icon/index.svg"},content:[]}]
if(!JSON.parse(localStorage.getItem('bookmarks'))){
    localStorage.setItem('bookmarks',JSON.stringify([{sidebar:{name:"首页",icon:"./images/icon/index.svg"},content:[]}]))
}
bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
for(i=0;i<bookmarks.length;i++){
    let index = i
    let temporaryArr = bookmarks[i]
    AddClassificationAndBookmarkContentFun(temporaryArr.sidebar.icon,temporaryArr.sidebar.name)
    for(j=0;j<temporaryArr.content.length;j++){
        let newBookmarkArr = temporaryArr.content[j]
        AddNewBookmarkFun(index,newBookmarkArr.url,newBookmarkArr.mark,newBookmarkArr.texticon.backgroundColor,newBookmarkArr.texticon.color,newBookmarkArr.texticon.text,newBookmarkArr.icon,newBookmarkArr.name)
    }
}
let style = document.getElementById("style")
let setStyle = document.getElementById("set-Style")
let setStyleBox = document.getElementsByClassName("set-Style-Box")[0]
function OpenStyleInterfaceFun(){
    setStyle.style.display = "flex"
    setStyle.style.animation = "opacity1 0.2s ease forwards"
    setStyleBox.style.animation = "setStyleIn 0.2s ease forwards"
}
style.onclick = function(){
    OpenStyleInterfaceFun()
}
let offSetStyleBox = document.getElementById("off-SetStyle-Box")
function CloseStyleInterfaceFun(){
    setStyle.style.animation = "opacity0 0.2s ease 1 forwards"
    setStyleBox.style.animation = "setStyleOut 0.2s ease 1 forwards"
    for(i=0;i<setStyleCard.length;i++){
        setStyleCard[i].className = "set-Style-Card setStyleCardpack"
        setStyleCard[i].getElementsByClassName("set-Style-Card-Icon")[0].style="animation: setStyleHeadlinePack 0.3s ease 1 forwards;"
    }
    setTimeout(function(){
        setStyle.style.display = "none"
    },300)
}
offSetStyleBox.onclick = function(){
    CloseStyleInterfaceFun()
}
let setStyleCard = document.getElementsByClassName("set-Style-Card")
let setStyleCardHeadline = document.getElementsByClassName("set-Style-Card-Headline")
for(i=0;i<setStyleCardHeadline.length;i++){
    setStyleCardHeadline[i].onclick = function(){
        let setStyleCardIcon = this.getElementsByClassName("set-Style-Card-Icon")[0]
        if(this.parentNode.className == "set-Style-Card setStyleCardOpen"){
            this.parentNode.className = "set-Style-Card setStyleCardPack"
            setStyleCardIcon.style="animation: setStyleHeadlinePack 0.3s ease 1 forwards;"
        }else{
            this.parentNode.className = "set-Style-Card setStyleCardOpen"
            setStyleCardIcon.style="animation: setStyleHeadlineOpen 0.3s ease 1 forwards;"
        }
        
    }
}
let wallpaperArr = ["./images/background/1.jpg"]
let wallpaper = document.getElementsByClassName("wallpaper")
let addWallpaper = document.getElementById("addBtn-Wallpaper")
let wallpaperBox = document.getElementById("wallpaper-Box")
if(!localStorage.getItem('wallpaper')){
    localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
}
wallpaperArr = JSON.parse(localStorage.getItem('wallpaper'))
body.style.backgroundImage = "url(" + wallpaperArr[0] + ")"
function wallpaperOnclick(e){
    body.style.backgroundImage = "url(" + e.getAttribute('src') + ")"
    wallpaperArr.splice(0,1,e.getAttribute('src'))
    localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
}
for(i=0;i<wallpaper.length;i++){
    wallpaper[i].onclick = function(){
        wallpaperOnclick(this)
    }
}
addWallpaper.onclick = function(){
    OpenAddIconBoxInterface()
    AddIconHeadline.innerText = "添加背景图片"
    AddIconUrlBoxText.innerHTML = "网络图片地址"
    iconPreviewText.innerHTML = "图片预览:"
    iconPreviewIcon.style.width = "160px"
    AddIconMark = "背景图片"
}
function addwallpaperFun(e){
    let newImg = document.createElement("img")
    newImg.className = "wallpaper"
    newImg.onclick = function(){
        wallpaperOnclick(newImg)
        WallpaperDataArrInit()
    }
    newImg.src = e
    wallpaperBox.insertBefore(newImg,addWallpaper)
}
for(i=1;i<wallpaperArr.length;i++){
    addwallpaperFun(wallpaperArr[i])
}
let styleArr = ["20","10","50","5","5","12","30","50","20","14","50","5","#1296db","1"]
let cssArr = [
    "--interfaceFontSize","--interfaceBordeRadius",
    "--sidebarWidth","--sidebarBorderRadius","--sidebarBlur","--sidebarFontSize","--sidebarIconSize",
    "--timeFontSize","--dateFontSize",
    "--bookmarkFontSize","--bookmarkIconSize","--bookmarkIconBordeRadius"
]
let textDomArr = [
    "interface-FontSize-Text","interface-BordeRadius-Text",
    "sidebarWidth-Text","sidebar-BorderRadius-Text","sidebar-Blur-Text","sidebar-FontSize-Text","sidebar-IconSize-Text",
    "time-FontSize-Text","date-FontSize-Text",
    "bookmark-FontSize-Text","bookmark-IconSize-Text","bookmark-Icon-BordeRadius-Text"
]
let cssRoot = document.documentElement
let setStyleInput = setStyle.getElementsByTagName("input")
let darkMode = document.getElementById("darkMode")
let darkModeHaft = document.getElementById("darkModeHaft")
let darkModeMark = false
if(localStorage.getItem('style')){
    styleArr = JSON.parse(localStorage.getItem('style'))
}else{
    localStorage.setItem('style',JSON.stringify(styleArr))
}
function styleInit(){
    let inita = parseInt(styleArr[9]) + parseInt(styleArr[10]) + 15
    cssRoot.style.setProperty("--gridSize",inita + "px")
    for(i=0;i<cssArr.length;i++){
        cssRoot.style.setProperty(cssArr[i],styleArr[i] + "px")
        let textDom = document.getElementById(textDomArr[i])
        textDom.innerHTML = styleArr[i] + "px"
        setStyleInput[i].value = styleArr[i]
    }
    cssRoot.style.setProperty("--themeColor",styleArr[12])
    if(styleArr[13] == "1"){
        darkModeOff()
    }
    if(styleArr[13] == "2"){
        darkModeOn()
    }
}
styleInit()
function ChangeSetting(e,v,t){
    t.innerHTML = v + "px"
    cssRoot.style.setProperty(e,v + "px" )
}
function styleConserve(e,v){
    styleArr.splice(e,1,v)
}
let interfaceFontSizeText = document.getElementById("interface-FontSize-Text")
let interfaceFontSizeinput = document.getElementById("interface-FontSize-input")
interfaceFontSizeinput.oninput = function(){
    ChangeSetting("--interfaceFontSize",interfaceFontSizeinput.value,interfaceFontSizeText)
}
let interfaceBordeRadiusText = document.getElementById("interface-BordeRadius-Text")
let interfaceBordeRadiusInput = document.getElementById("interface-BordeRadius-Input")
interfaceBordeRadiusInput.oninput = function(){
    ChangeSetting("--interfaceBordeRadius",interfaceBordeRadiusInput.value,interfaceBordeRadiusText)
}
let themeColorShow = document.getElementById("themeColor-Show")
let setStylethemeColor = document.getElementsByClassName("set-Style-themeColor")
for(i=0;i<setStylethemeColor.length;i++){
    setStylethemeColor[i].onclick = function(){
        cssRoot.style.setProperty("--themeColor",getComputedStyle(this).backgroundColor)
    }
}
function darkModeOn(){
    darkModeHaft.style.left = "20px"
    cssRoot.style.setProperty('--interfaceBackgroundColor1','#000000')
    cssRoot.style.setProperty('--interfaceBackgroundColor2','#555555')
    cssRoot.style.setProperty('--interfaceFontColor','#eeeeee')
    cssRoot.style.setProperty('--bookmarkFontColor','#eeeeee')
    darkModeMark = true
}
function darkModeOff(){
    darkModeHaft.style.left = "0"
    cssRoot.style.setProperty('--interfaceBackgroundColor1','#ffffff')
    cssRoot.style.setProperty('--interfaceBackgroundColor2','#eeeeee')
    cssRoot.style.setProperty('--interfaceFontColor','#000000')
    cssRoot.style.setProperty('--bookmarkFontColor','#000000')
    darkModeMark = false
}
darkMode.onclick = function(){
    if(darkModeMark){
        darkModeOff()
        styleConserve("13","1")
    }else{
        darkModeOn()
        styleConserve("13","2")
    }
}
let interfaceStyleConfirm = document.getElementById("interface-Style-Confirm")
let interfaceStyleReset = document.getElementById("interface-Style-Reset")
interfaceStyleConfirm.onclick = function(){
    styleConserve("0",interfaceFontSizeinput.value)
    styleConserve("1",interfaceBordeRadiusInput.value)
    styleConserve("12",getComputedStyle(themeColorShow).backgroundColor)
    localStorage.setItem('style',JSON.stringify(styleArr))
    this.parentNode.parentNode.parentNode.className = "set-Style-Card setStyleCardPack"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].className = "set-Style-Card-Icon"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].style="animation: setStyleHeadlinePack 0.3s ease 1 forwards"
    hintText("界面设置保存成功")
}
interfaceStyleReset.onclick = function(){
    styleConserve("0","20")
    styleConserve("1","10")
    styleConserve("12","#1296db")
    styleConserve("13","1")
    localStorage.setItem('style',JSON.stringify(styleArr))
    ChangeSetting("--interfaceFontSize","20",interfaceFontSizeText)
    interfaceFontSizeinput.value = "20"
    ChangeSetting("--interfaceBordeRadius","10",interfaceBordeRadiusText)
    interfaceBordeRadiusInput.value = "10"
    cssRoot.style.setProperty("--themeColor","#1296db")
    darkModeOff()
}
let sidebarWidthInput = document.getElementById("sidebarWidth-Input")
let sidebarWidthText = document.getElementById("sidebarWidth-Text")
sidebarWidthInput.oninput = function(){
    ChangeSetting("--sidebarWidth",sidebarWidthInput.value,sidebarWidthText)
}
let sidebarBorderRadiusInput = document.getElementById("sidebar-BorderRadius-Input")
let sidebarBorderRadiusText = document.getElementById("sidebar-BorderRadius-Text")
sidebarBorderRadiusInput.oninput = function(){
    ChangeSetting("--sidebarBorderRadius",sidebarBorderRadiusInput.value,sidebarBorderRadiusText)
}
let sidebarBlurInput = document.getElementById("sidebar-Blur-Input")
let sidebarBlurText = document.getElementById("sidebar-Blur-Text")
sidebarBlurInput.oninput = function(){
    ChangeSetting("--sidebarBlur",sidebarBlurInput.value,sidebarBlurText)
}
let sidebarFontSizeInput = document.getElementById("sidebar-FontSize-Input")
let sidebarFontSizeText = document.getElementById("sidebar-FontSize-Text")
sidebarFontSizeInput.oninput = function(){
    ChangeSetting("--sidebarFontSize",sidebarFontSizeInput.value,sidebarFontSizeText)
}
let sidebarIconSizeInput = document.getElementById("sidebar-IconSize-Input")
let sidebarIconSizeText = document.getElementById("sidebar-IconSize-Text")
sidebarIconSizeInput.oninput = function(){
    ChangeSetting("--sidebarIconSize",sidebarIconSizeInput.value,sidebarIconSizeText)
}
let sidebarStyleReset = document.getElementById("sidebar-Style-Reset")
let sidebarStyleConfirm = document.getElementById("sidebar-Style-Confirm")
sidebarStyleReset.onclick = function(){
    styleConserve("2","50")
    styleConserve("3","5")
    styleConserve("4","5")
    styleConserve("5","12")
    styleConserve("6","30")
    localStorage.setItem('style',JSON.stringify(styleArr))
    ChangeSetting("--sidebarWidth","50",sidebarWidthText)
    sidebarWidthInput.value = "50"
    ChangeSetting("--sidebarBorderRadius","5",sidebarBorderRadiusText)
    sidebarBorderRadiusInput.value = "5"
    ChangeSetting("--sidebarBlur","5",sidebarBlurText)
    sidebarBlurInput.value = "5"
    ChangeSetting("--sidebarFontSize","12",sidebarFontSizeText)
    sidebarFontSizeInput.value = "12"
    ChangeSetting("--sidebarIconSize","30",sidebarIconSizeText)
    sidebarIconSizeInput.value = "30"
}
sidebarStyleConfirm.onclick = function(){
    styleConserve("2",sidebarWidthInput.value)
    styleConserve("3",sidebarBorderRadiusInput.value)
    styleConserve("4",sidebarBlurInput.value)
    styleConserve("5",sidebarFontSizeInput.value)
    styleConserve("6",sidebarIconSizeInput.value)
    localStorage.setItem('style',JSON.stringify(styleArr))
    this.parentNode.parentNode.parentNode.className = "set-Style-Card setStyleCardPack"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].className = "set-Style-Card-Icon"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].style="animation: setStyleHeadlinePack 0.3s ease 1;animation-fill-mode: forwards;"
    hintText("侧边栏设置保存成功")
}
let timeFontSizeInput = document.getElementById("time-FontSize-Input")
let timeFontSizeText = document.getElementById("time-FontSize-Text")
timeFontSizeInput.oninput = function(){
    ChangeSetting("--timeFontSize",timeFontSizeInput.value,timeFontSizeText)
}
let dateFontSizeInput = document.getElementById("date-FontSize-Input")
let dateFontSizeText = document.getElementById("date-FontSize-Text")
dateFontSizeInput.oninput = function(){
    ChangeSetting("--dateFontSize",dateFontSizeInput.value,dateFontSizeText)
}
let timeStyleReset = document.getElementById("time-Style-Reset")
let timeStyleConfirm = document.getElementById("time-Style-Confirm")
timeStyleReset.onclick = function(){
    styleConserve("7","50")
    styleConserve("8","20")
    localStorage.setItem('style',JSON.stringify(styleArr))
    ChangeSetting("--timeFontSize","50",timeFontSizeText)
    timeFontSizeInput.value = "50"
    ChangeSetting("--dateFontSize","20",dateFontSizeText)
    dateFontSizeInput.value = "20"
}
timeStyleConfirm.onclick = function(){
    styleConserve("7",timeFontSizeInput.value)
    styleConserve("8",dateFontSizeInput.value)
    localStorage.setItem('style',JSON.stringify(styleArr))
    this.parentNode.parentNode.parentNode.className = "set-Style-Card setStyleCardPack"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].className = "set-Style-Card-Icon"
    this.parentNode.parentNode.parentNode.getElementsByClassName("set-Style-Card-Icon")[0].style="animation: setStyleHeadlinePack 0.3s ease 1;animation-fill-mode: forwards;"
    hintText("时间设置保存成功")

}
let bookmarkFontSizeInput = document.getElementById("bookmark-FontSize-Input")
let bookmarkFontSizeText = document.getElementById("bookmark-FontSize-Text")
bookmarkFontSizeInput.oninput = function(){
    ChangeSetting("--bookmarkFontSize",bookmarkFontSizeInput.value,bookmarkFontSizeText)
    cssRoot.style.setProperty("--gridSize",parseInt(bookmarkFontSizeInput.value) + parseInt(bookmarkIconSizeInput.value) + 15 + "px")
}
let bookmarkIconSizeInput = document.getElementById("bookmark-IconSize-Input")
let bookmarkIconSizeText = document.getElementById("bookmark-IconSize-Text")
bookmarkIconSizeInput.oninput = function(){
    ChangeSetting("--bookmarkIconSize",bookmarkIconSizeInput.value,bookmarkIconSizeText)
    cssRoot.style.setProperty("--gridSize",parseInt(bookmarkFontSizeInput.value) + parseInt(bookmarkIconSizeInput.value) + 15 + "px")
}
let bookmarkIconBordeRadiusInput = document.getElementById("bookmark-Icon-BordeRadius-Input")
let bookmarkIconBordeRadiusText = document.getElementById("bookmark-Icon-BordeRadius-Text")
bookmarkIconBordeRadiusInput.oninput = function(){
    ChangeSetting("--bookmarkIconBordeRadius",bookmarkIconBordeRadiusInput.value,bookmarkIconBordeRadiusText)
}
let bookmarkStyleReset = document.getElementById("bookmark-Style-Reset")
let bookmarkStyleConfirm = document.getElementById("bookmark-Style-Confirm")
bookmarkStyleReset.onclick = function(){
    styleConserve("9","14")
    styleConserve("10","50")
    styleConserve("11","5")
    localStorage.setItem('style',JSON.stringify(styleArr))
    ChangeSetting("--bookmarkFontSize","14",bookmarkFontSizeText)
    bookmarkFontSizeInput.value = "14"
    ChangeSetting("--bookmarkIconSize","50",bookmarkIconSizeText)
    bookmarkIconSizeInput.value = "50"
    ChangeSetting("--bookmarkIconBordeRadius","5",bookmarkIconBordeRadiusText)
    bookmarkIconBordeRadiusInput.value = "5"
    
}
bookmarkStyleConfirm.onclick = function(){
    styleConserve("9",bookmarkFontSizeInput.value)
    styleConserve("10",bookmarkIconSizeInput.value)
    styleConserve("11",bookmarkIconBordeRadiusInput.value)
    localStorage.setItem('style',JSON.stringify(styleArr))
    setStyleCard[5].className = "set-Style-Card setStyleCardPack"
    hintText("书签设置保存成功")
}
let bookmarksClearing = document.getElementById("bookmarks-Clearing")
bookmarksClearing.onclick = function(){
    for(i=0;i<bookmarks.length;i++){
        classification[0].remove()
        bookmarkContent[0].remove()
    }
    localStorage.setItem('bookmarks',JSON.stringify([{sidebar:{name:"首页",icon:"./images/icon/index.svg"},content:[]}]))
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    AddClassificationAndBookmarkContentFun(bookmarks[0].sidebar.icon,bookmarks[0].sidebar.name)
    hintText("清除成功")
}
let iconClearing = document.getElementById("icon-Clearing")
iconClearing.onclick = function(){
    for(i=addClassificationIcon.length-1;i>9;i--){
        addClassificationIcon[i].remove()
    }
    localStorage.setItem('icon',JSON.stringify([]))
    iconArr = JSON.parse(localStorage.getItem('icon'))
    hintText("清除成功")
}
let styleClearing = document.getElementById("style-Clearing")
styleClearing.onclick = function(){
    styleArr = ["20","10","50","5","5","12","30","50","20","14","50","5","#1296db","1"]
    localStorage.setItem('style',JSON.stringify(styleArr))
    styleInit()
    hintText("设置重置成功")
}
let wallpaperClearing = document.getElementById("wallpaper-Clearing")
wallpaperClearing.onclick = function(){
    wallpaperArr = ["./images/background/1.jpg"]
    localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
    for(i=wallpaper.length-1;i>4;i--){
        wallpaper[i].remove()
    }
    body.style.backgroundImage = "url(" + wallpaperArr[0] + ")"
    hintText("清除成功")
}
let exportLocalStorage = document.getElementById("export-LocalStorage")
let ImportLocalStorage = document.getElementById("Import-LocalStorage")
let fileBox = document.getElementById("file-Box")
exportLocalStorage.onclick = function(){
    let temporaryArr = []
    temporaryArr.push(styleArr)
    temporaryArr.push(wallpaperArr)
    temporaryArr.push(iconArr)
    temporaryArr.push(bookmarks)
    let newA = document.createElement('a')
    newA.download = +new Date() + ".ACdata"
    newA.style.display = 'none'
    let blob = new Blob([JSON.stringify(temporaryArr)])
    newA.href = URL.createObjectURL(blob)
    newA.click();
}
ImportLocalStorage.onclick = function(){
    let newInput = document.createElement('input')
    newInput.type = "file"
    newInput.style.display = "none"
    newInput.click()
    newInput.onchange = function(e){
        let file  = e.target.files[0]
        let fileType = file.name.split(/[.;]/)
        if(fileType[fileType.length-1] == "ACdata"){
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
                let contents =JSON.parse(e.target.result)
                styleArr = contents[0]
                localStorage.setItem('style',JSON.stringify(styleArr))
                wallpaperArr = contents[1]
                localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
                iconArr = contents[2]
                localStorage.setItem('icon',JSON.stringify(iconArr))
                bookmarks = contents[3]
                localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                window.location.href = window.location.href
            }
        }else{
            hintText("请选择正确的数据文件(xxx.ACdata)")
        }
    }
}
document.oncontextmenu = function(){
    return false
}
let compileClassificationBox = document.getElementById("compile-classification-Box")
let rightClickMenu = document.getElementById("rightClick-Menu")
function OpenCompileMenuFun(x,y){
    compileClassificationBox.style.display = "flex"
    rightClickMenu.style.display = "none"
    compileClassificationBox.style.left = x + 7 + "px"
    compileClassificationBox.style.top = y + 5 + "px"
}
let MenuIndex = ""
body.onclick = function(e){
    let ep = e.composedPath()
    if(ep.indexOf(compileClassificationBox) == "-1"){
        compileClassificationBox.style.display = "none"
        MenuIndex = ""
    }
    if(ep.indexOf(rightClickMenu) == "-1"){
        rightClickMenu.style.display = "none"
        MenuIndex = ""
    }
}
let compileclassificationIndex = ""
let compileclassification = document.getElementById("compile-classification")
compileclassification.onclick = function(){
    compileClassificationBox.style.display = "none"
    if(MenuIndex == "classification"){
        OpenAddClassificationInterface()
        Pattern = "compile"
        addClassificationName.value = bookmarks[compileclassificationIndex].sidebar.name
    }
    if(MenuIndex == "bookmark"){
        BookmarkContentAddBtnFun()
        Pattern = "compile"
        let temporaryArr = bookmarks[clickClassificationindex].content[compileclassificationIndex]
        addBookmarkUrl.value = temporaryArr.url
        addBookmarkName.value = temporaryArr.name
        addBookmarkIconMark = temporaryArr.mark
        if(addBookmarkIconMark == "1"){
            textIconContent.innerHTML = textIconInput.value = temporaryArr.texticon.text
            textIconContent.style.backgroundColor = textIconbackgroundColorData = temporaryArr.texticon.backgroundColor
            textIconContent.style.color = textIocnFontColorData = temporaryArr.texticon.color
        }
        if(addBookmarkIconMark == "2"){
            bookmarkSetIconFavicon.style.display = "flex"
            EmptyBookmarkIconSelectFun()
            addBookmarkSetImg.parentNode.className = "add-Bookmark-Set-Icon"
            addBookmarkIconMark = "2"
            addBookmarkSetImg.src = addBookmarkIconData = temporaryArr.icon
        }
        if(addBookmarkIconMark == "3"){
            AddBookmarkIconFun(temporaryArr.icon)
            EmptyBookmarkIconSelectFun()
            addBookmarkSetIcon[2].className = "add-Bookmark-Set-Icon"
            addBookmarkIconMark = "3"
            addBookmarkIconData = temporaryArr.icon
        }
    }
}
let deleteclassification = document.getElementById("delete-classification")
deleteclassification.onclick = function(){
    compileClassificationBox.style.display = "none"
    if(MenuIndex == "classification"){
        bookmarks.splice(compileclassificationIndex,1)
        classification[compileclassificationIndex].remove()
        bookmarkContent[compileclassificationIndex].remove()
        if(bookmarks.length == "0"){
            AddClassificationAndBookmarkContentFun("./images/icon/index.svg","首页")
            bookmarks.push({sidebar:{name:"首页",icon:"./images/icon/index.svg"},content:[]})
        }
        bookmarkContent[0].style.display = "grid"
        clickClassificationindex = clickClassificationMark = "0"
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    if(MenuIndex == "bookmark"){
        bookmarkContent[clickClassificationindex].getElementsByTagName("a")[compileclassificationIndex].remove()
        bookmarks[clickClassificationindex].content.splice(compileclassificationIndex,1)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
}
let contentArea = document.getElementsByClassName("content-Area")[0]
contentArea.onmousedown = function(e){
    if(e.button == "2"){
        let ep = e.composedPath()
        let bookmark = bookmarkContent[clickClassificationindex].getElementsByClassName("bookmark")
        let Mark = false
        for(i=0;i<bookmark.length;i++){
            if(ep.indexOf(bookmark[i]) != "-1"){
                Mark = true
            }
        }
        if(!Mark){
            rightClickMenu.style.display = "flex"
            compileClassificationBox.style.display = "none"
            rightClickMenu.style.left = e.pageX + 7 + "px"
            rightClickMenu.style.top = e.pageY + 5 + "px"
        }
    }
}
let rightClickMenuWallpaper = document.getElementById("rightClick-Menu-Wallpaper")
let switchoverWallpaperInitArr = ["./images/background/1.jpg","./images/background/2.jpg","./images/background/3.jpg",
"./images/background/4.jpg","./images/background/5.jpg"]
let switchoverWallpaperArr = []
let WallpaperDataArr = []

function WallpaperDataArrInit(){
    let Arr = switchoverWallpaperInitArr.concat(wallpaperArr)
    for(i=0;i<Arr.length;i++){
        if(switchoverWallpaperArr.indexOf(Arr[i]) == "-1"){
            switchoverWallpaperArr.push(Arr[i])
        }
    }
    Arr.splice(switchoverWallpaperArr.indexOf(wallpaperArr[0]), 1)
    WallpaperDataArr = Arr
}
WallpaperDataArrInit()
rightClickMenuWallpaper.onclick = function(){
    if(WallpaperDataArr.length == "0"){
        WallpaperDataArrInit()
    }
    let index = WallpaperDataArr.length - 1
    let switchoverWallpaperIndex = Math.round( Math.random() * index);
    body.style.backgroundImage = "url(" + WallpaperDataArr[switchoverWallpaperIndex] + ")"
    wallpaperArr.splice(0,1,WallpaperDataArr[switchoverWallpaperIndex])
    localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
    WallpaperDataArr.splice(switchoverWallpaperIndex,1)
    rightClickMenu.style.display = "none"
}
let rightClickMenuRefresh = document.getElementById("rightClick-Menu-Refresh")
rightClickMenuRefresh.onclick = function(){
    window.location.href = window.location.href
}
let rightClickMenuAddBookmark = document.getElementById("rightClick-Menu-AddBookmark")
rightClickMenuAddBookmark.onclick = function(){
    OpenAddBookmarkInterface()
    Pattern = "add"
    rightClickMenu.style.display = "none"
}
let rightClickMenuStyle = document.getElementById("rightClick-Menu-Style")
rightClickMenuStyle.onclick = function(){
    OpenStyleInterfaceFun()
    rightClickMenu.style.display = "none"
}
body.onkeydown = function(e){
    if(e.key == "Tab"){
        return false
    }
}
body.onselectstart = function(){
    return false
}
body.ondragstart = function(){
    return false
}
body.ondragover = function(){
    return false
}
body.ondragleave = function(){
    return false
}
let importData = document.getElementById("importData")
let importDataBox = document.getElementsByClassName("importDataBox")[0]
importData.onclick = function(e){
    let ep = e.composedPath()
    if(ep.indexOf(importDataBox) == "-1"){
        CloseImportDataInterfaceFun()
    }
}
body.ondrop = function(e){
    let fileType = e.dataTransfer.files[0].name.split(/[.;]/)
    if(fileType[fileType.length-1] == "ACdata"){
        importData.style.display = "flex"
        importData.style.animation = "opacity1 0.3s ease 1 forwards"
        cacheDataFile = e.dataTransfer.files[0]
        return false
    }
}
let cacheDataFile = ""
let importDataConfirm = document.getElementById("importData-Confirm")
importDataConfirm.onclick = function(){
    let reader = new FileReader();
    reader.readAsText(cacheDataFile);
    reader.onload = function(e){
        let contents =JSON.parse(e.target.result)
        styleArr = contents[0]
        localStorage.setItem('style',JSON.stringify(styleArr))
        wallpaperArr = contents[1]
        localStorage.setItem('wallpaper',JSON.stringify(wallpaperArr))
        iconArr = contents[2]
        localStorage.setItem('icon',JSON.stringify(iconArr))
        bookmarks = contents[3]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    window.location.href = window.location.href
}
let importDataReset = document.getElementById("importData-Reset")
function CloseImportDataInterfaceFun(){
    importData.style.animation = "opacity0 0.3s ease 1 forwards"
    cacheDataFile = ""
    setTimeout(function(){
        importData.style.display = "none"
    },300)
}
importDataReset.onclick = function(){
    CloseImportDataInterfaceFun()
}