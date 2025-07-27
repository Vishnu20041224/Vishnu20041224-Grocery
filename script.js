// Created Explore Categories Productes

let exploreCategoriesData = null
async function exploreCategoriesDatas() {
    try {
        let response = await fetch("explorecatergories.json")
        if (!response.ok) {
            throw new Error("Something Worng in JSON File")
        }
        exploreCategoriesData = await response.json()
        createExploreCategories(exploreCategoriesData)
        filterExploreCatergories(exploreCategoriesData)
        // console.log(response);
    }
    catch (error) {
        console.error(error)
    }
}
exploreCategoriesDatas()


function createExploreCategories(exploreCategoriesData) {
    let cretedAllExploreCat = exploreCategoriesData.map((exploreCat) => {
        return ` <div class="ecProduted d-flex align-items-center p-3">
                 <div><img src= "${exploreCat.src}" alt="${exploreCat.name}"></div>
                 <h4 class="ecProdutedName">${exploreCat.name}</h4>
                </div>`
    }).join("")
    let exploreCategoriesProducteds = document.querySelector(".exploreCategoriesProducteds")
    exploreCategoriesProducteds.innerHTML = cretedAllExploreCat
    // console.log(cretedAllExploreCat);
}

// filter Explore Catergories productes
let exploreCategoriescateres = document.querySelector(".exploreCategoriescateres")
let exploreCategoriescateresli = document.querySelectorAll(".exploreCategoriescateres li")

// exploreCategoriescateresli[0].style.color = "green"

function filterExploreCatergories(exploreCategoriesData) {
    let allCategorys = exploreCategoriesData.map((exploreCategories) => {
        return exploreCategories.catagory
    })
    let catagorys = ["All", ...new Set(allCategorys)]
    exploreCategoriescateres.innerHTML = catagorys.map((catagory) => `<li class="px-2 py-4">${catagory}</li>`).join("")

    let exploreCategoriescateresSpan = document.querySelectorAll(".exploreCategoriescateres li")
    exploreCategoriescateresSpan[0].classList.add("selectProducte")

    exploreCategoriescateres.addEventListener("click", (e) => {
        let clickcatagort = e.target.textContent.trim()
        clickcatagort === catagorys[0] ? createExploreCategories(exploreCategoriesData) : createExploreCategories(exploreCategoriesData.filter((exploreCategories) => exploreCategories.catagory === clickcatagort))

        // exploreCategoriescateresSpan = document.querySelectorAll(".exploreCategoriescateres li")

        exploreCategoriescateresSpan.forEach((span) => span.classList.remove("selectProducte"))
        e.target.classList.add("selectProducte")

    })
}
// filterExploreCatergories(exploreCategoriesData)

// create featuredProducts
let featuredProductsData = null
async function createFeaturedProductsDatas() {
    try {
        let response = await fetch("featuredProductsData.json")
        if (!response.ok) {
            throw new Error("Something Wrong on featuredProductsData JSON File")
        }
        // console.log(response);

        featuredProductsData = await response.json()

        createFeaturedProducts(featuredProductsData)
        filterFeaturedProducts(featuredProductsData)
        featuredProductslider()
    }
    catch (error) {
        console.log(error);
    }
}
createFeaturedProductsDatas()


function createFeaturedProducts(featuredProductsData) {
    let createsAllFeaturesPro = featuredProductsData.map((featuredProduct) => {
        return ` <div class="featuredProduct p-2">
                        <div>
                            <img class="fdImg" src="${featuredProduct.src}" alt="">
                            <div class="like p-1">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>

                        <div>
                            <p class="fdCatagory">${featuredProduct.catagory}</p>
                            <h6 class="fdName">${featuredProduct.name}</h6>
                            <img src="/Assets/featured products/rating.png" alt="">

                            <p>By Mr.food</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex align-items-center gap-2">
                                    <h5 class = "fdRate" data-price ="${featuredProduct.currentRate}" >₹${featuredProduct.currentRate}</h5>
                                    <p class="FPdicount m-0">₹${featuredProduct.mrp}</p>
                                </div>
                                <div class="addToCartFP">
                                    <button class="addToCartFP"><img class="addToCartFP2" src="/Assets/featured products/shopping-cart.png" alt="">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    }).join("")
    let allfeaturedProducts = document.querySelector(".allfeaturedProducts")
    allfeaturedProducts.innerHTML = createsAllFeaturesPro
    // console.log(createsAllFeaturesPro);

}
// createFeaturedProducts(featuredProductsData)

function filterFeaturedProducts(featuredProductsData) {
    let allCatergoriesFeaturesPro = featuredProductsData.map((featuredProduct) => featuredProduct.catagory)
    let catagoryFeaturedProduct = ["All", ...new Set(allCatergoriesFeaturesPro)]
    let allCategoriesfeaturedProducts = document.querySelector(".allCategoriesfeaturedProducts")
    allCategoriesfeaturedProducts.innerHTML = catagoryFeaturedProduct.map((catagory) => {
        return ` <li class="px-2 py-4" >${catagory}</li>`
    }).join("")

    // add defalt green color 
    let allCategoriesfeaturedProductsli = document.querySelectorAll(".allCategoriesfeaturedProducts li")
    allCategoriesfeaturedProductsli[0].classList.add("selectProducte")

    // filter thr product if there click
    allCategoriesfeaturedProducts.addEventListener("click", (e) => {
        let selectCatergories = e.target.textContent.trim()
        selectCatergories === "All" ? createFeaturedProducts(featuredProductsData) : createFeaturedProducts(featuredProductsData.filter((product) => product.catagory === selectCatergories))

        allCategoriesfeaturedProductsli.forEach((li) => {
            li.classList.remove("selectProducte")
        })
        e.target.classList.add("selectProducte")
    })
}
// filterFeaturedProducts(featuredProductsData)

// link
let wishC = document.querySelector(".wishC")
let wishListContainer = document.querySelector(".wishListContainer")
let wishCount = document.querySelector(".wishCount")

let wishArr = []
// let wishCountStart = wishArr.length
wishCount.innerHTML = wishArr.length


//wishListContainer open & close
wishC.addEventListener("click", () => {
    if (wishListContainer.style.display === "none") {
        wishListContainer.style.display = "block"
        addToCartContainer.classList.remove("displayBlock")
    }
    else {
        wishListContainer.style.display = "none"
    }
})



wishListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeWish")) {

        let removeDiv = e.target.parentElement.parentElement
        let removeName = removeDiv.querySelector("h3").textContent

        let localStorageAddToCartArr = JSON.parse(localStorage.getItem("like")) || []

        localStorageAddToCartArr = localStorageAddToCartArr.filter((localStorageAddToCartArr) => localStorageAddToCartArr.name != removeName)
        wishArr = localStorageAddToCartArr

        localStorage.setItem("like", JSON.stringify(localStorageAddToCartArr))

        let wishListlength = JSON.parse(localStorage.getItem("like")).length

        let wishCount = document.querySelector(".wishCount")
        wishCount.innerHTML = ""
        wishCount.innerHTML = wishListlength

        DBSproductArray = localStorageAddToCartArr;
        removeDiv.remove()
    }

})



let exploreCategoriesPro = document.querySelector("#exploreCategoriesPro")
exploreCategoriesPro.addEventListener("click", (e) => {
    // console.log(exploreCategoriesPro);
    if (e.target.classList.contains("fa-heart")) {
        let fdProduct = e.target.parentElement.parentElement.parentElement
        let nameEle = fdProduct.querySelector(".fdName")
        let rateEle = fdProduct.querySelector(".fdRate")
        let imgEle = fdProduct.querySelector(".fdImg")
        let catagoryEle = fdProduct.querySelector(".fdCatagory")
        let like = fdProduct.querySelector(".like i")
        // console.log(fdProduct);


        let fpName = nameEle.textContent
        let fpRate = rateEle.textContent
        let fpImg = imgEle.src
        let fpCatagory = catagoryEle.textContent

        let alreadyExists = wishArr.find(item => item.name === fpName)
        // console.log(alreadyExists);
        if (!alreadyExists) {
            like.className = "fa-solid fa-heart";
            like.style.color = "#ff0000"

            let wishObj = {
                name: fpName,
                rate: fpRate,
                src: fpImg,
                catagory: fpCatagory,
            }

            wishArr.push(wishObj)
            localStorage.setItem("like", JSON.stringify(wishArr))


            // let wishListLenth = localStorage.setItem("like", JSON.stringify(wishArr)).length
            let wishListLenth = JSON.parse(localStorage.getItem("like")).length
            // console.log(wishListLenth);

            // console.log(wishArr);
            wishCount.innerHTML = ""
            wishCount.innerHTML = parseInt(wishListLenth)

            let wishList = document.createElement("div")
            wishList.className = "wishList d-flex align-items-center justify-content-between"
            wishList.innerHTML = `<div><img src="${wishObj.src}" alt=""></div>
                            <div>
                                <h3>${wishObj.name}</h3>
                                <div class="d-flex align-items-center justify-content-between">
                                    <p>${wishObj.catagory}</p>
                                    <p>${wishObj.rate}</p>
                                </div>
                                <i class="removeWish fa-solid fa-trash " style="color: #ff0000;"></i>
                            </div>`
            let wishListContainer = document.querySelector(".wishListContainer")
            wishListContainer.appendChild(wishList)

            // console.log(wishArr.length);



        }
        else {
            alert("Item already in wishlist");        
        }
    }
})


// wish list set in local storeage
function localStorageWishList() {
    let wishList = JSON.parse(localStorage.getItem("like")) || []
    wishArr = wishList
    wishList.forEach((like) => {
        let wishList = document.createElement("div")
        wishList.className = "wishList d-flex align-items-center justify-content-between"
        wishList.innerHTML = `<div><img src="${like.src}" alt=""></div>
                            <div>
                                <h3>${like.name}</h3>
                                <div class="d-flex align-items-center justify-content-between">
                                    <p>${like.catagory}</p>
                                    <p>${like.rate}</p>
                                </div>
                                <i class="removeWish fa-solid fa-trash " style="color: #ff0000;"></i>
                            </div>`
        let wishListContainer = document.querySelector(".wishListContainer")
        wishListContainer.appendChild(wishList)

    })
    wishCount.innerHTML = wishList.length

    let featuredProduct = document.querySelectorAll(".featuredProduct .fdName")
    let featuredProductName = Array.from(featuredProduct).map((fpName) => fpName.textContent.trim())

    let wishName = wishList.map((wish) => wish.name)

    let matchWishs = featuredProductName.filter(fdName => wishName.includes(fdName))
}

// dailyBestSellsData Producteds
let dailyBestSellsData = null
async function dailyBestSellsDatas() {
    try {
        let response = await fetch("dailyBestSellsData.json")
        if (!response.ok) {
            throw new Error("Something Wrong in dailyBestSellsData JSON File")
        }
        dailyBestSellsData = await response.json()
        createdDailySells(dailyBestSellsData)
        dailyBestSellsSlider()
    }
    catch (error) {
        console.error(error)
    }
}
dailyBestSellsDatas()



function createdDailySells(dailyBestSellsData) {
    let creatsAllDailyBestSells = dailyBestSellsData.map((dailyBestSells) => {
        return `<div class="DBSproduct">
                            
                <div><img class="dbsImg" src="${dailyBestSells.src}" alt=""></div>
                <span class="dbsCatagory">${dailyBestSells.catagory}</span>
                <div class="d-sm-flex align-items-center justify-content-between">
                    <h6 class="dbsName">${dailyBestSells.name}</h6>
                    <img src="/Assets/Daily Best Sells/rating.png" alt="">
                </div>
                <p class="m-0">By <span>${dailyBestSells.saler}</span></p>
                <div class="d-flex align-items-center gap-3">
                    <span class="DBSprice">₹${dailyBestSells.currentRate}</span>
                    <span class="DBSdiscount">₹${dailyBestSells.mrp}</span>
                </div>
                <button class="addToCart">
                    <img class="addToCart2" src="/Assets/Daily Best Sells/shopping-cart.png" alt="">
                    <span class="addToCart2">Add to Cart</span>
                </button>
                <div class="DBSsave">
                    Save ${dailyBestSells.save}%
                </div>
                
            </div>`

    }).join("")
    let dailyBestSellsAllProduct = document.querySelector(".dailyBestSellsAllProduct")
    dailyBestSellsAllProduct.innerHTML = creatsAllDailyBestSells

}
// createdDailySells(dailyBestSellsData)


// Add To Cart

let AddTocartMain = document.querySelector(".cart")
let addToCartContainer = document.querySelector(".addToCartContainer")

AddTocartMain.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-cart-shopping") || e.target.classList.contains("fs-6") || e.target.classList.contains("cartAmount")) {

        addToCartContainer.classList.toggle("displayBlock")
        if (addToCartContainer.classList.contains("displayBlock")) {

            let wishListContainer = document.querySelector(".wishListContainer")
            wishListContainer.style.display = "none"
        }

    }
})

let addContainerClose = document.querySelector(".addContainerClose")

addContainerClose.addEventListener("click", (e) => {
    // if (e.target.classList.contains("addContainerClose")) {
    addToCartContainer.classList.remove("displayBlock")
    addToCartContainer.classList.add("displayNone")

    // }
})

let DBSproductArray = []
// let addToCart = document.querySelectorAll(".addToCart")

function addToCartinContainer() {
    let dailyBestSellsAllProduct = document.querySelector(".dailyBestSellsAllProduct")
    dailyBestSellsAllProduct.addEventListener("click", (e) => {

        if (e.target.classList.contains("addToCart")) {

            let DBSproduct = e.target.parentElement
            let dbsProductImg = DBSproduct.querySelector(".dbsImg")
            // let dbsProductImg = dbsProductImgTag.src
            let dbsProductCatagory = DBSproduct.querySelector(".dbsCatagory")
            let dbsProductName = DBSproduct.querySelector(".dbsName")
            let dbsProductRate = DBSproduct.querySelector(".DBSprice")

            let DBSproductObj = {
                name: dbsProductName.innerHTML,
                rate: dbsProductRate.innerHTML,
                img: dbsProductImg.src,
                catagory: dbsProductCatagory.innerHTML,
                count: 1,
            }

            let allReady = DBSproductArray.some((item) => item.name === DBSproductObj.name)

            if (allReady) {
                alert("All Ready Have in Add to Cart")
            }
            else {
                DBSproductArray.push(DBSproductObj)
                // add to cart container creat element 
                let div = document.createElement("div")
                div.className = "addToCart d-flex gap-2 align-items-center px-2"
                div.innerHTML = `
                <div> <img
                src="${DBSproductObj.img}"
                alt=""></div>
                <div>
                <h5 class="addName">${DBSproductObj.name}</h5>
                <span class="addCatergory">${DBSproductObj.catagory}</span>
                <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                <input class="addCount" type="text" value="${DBSproductObj.count}" min="1" max="5">
                <div>
                <button class="incress">+</button>
                <button class="decress">-</button>
                </div>
                </div>
                <p class="addAmount" data-price ="${DBSproductObj.rate}">${DBSproductObj.rate}</p>
                </div>
                <i class="addRemove fa-solid fa-trash" style="color: #ff0000;"></i>
                </div>`
                addToCartContainer.append(div)

                // total amount
                let cartAmounts = document.querySelectorAll(".addToCartContainer .addAmount")
                let totalAmt = 0
                cartAmounts.forEach((cartAmt) => {
                    let amount = cartAmt.innerHTML.replace("₹", "")
                    totalAmt += parseInt(amount)
                })
                let cartAmount = document.querySelector(".cartAmount")
                cartAmount.innerHTML = `₹ ${totalAmt}`
            }

        }
        else if (e.target.classList.contains("addToCart2")) {

            let DBSproduct = e.target.parentElement.parentElement
            let dbsProductImg = DBSproduct.querySelector(".dbsImg")
            // let dbsProductImg = dbsProductImgTag.src
            let dbsProductCatagory = DBSproduct.querySelector(".dbsCatagory")
            let dbsProductName = DBSproduct.querySelector(".dbsName")
            let dbsProductRate = DBSproduct.querySelector(".DBSprice")

            let DBSproductObj = {
                name: dbsProductName.innerHTML,
                rate: dbsProductRate.innerHTML,
                img: dbsProductImg.src,
                catagory: dbsProductCatagory.innerHTML,
                count: 1,
            }

            let allReady = DBSproductArray.some((item) => item.name === DBSproductObj.name)

            if (allReady) {
                alert("All Ready Have in Add to Cart")
            }
            else {
                DBSproductArray.push(DBSproductObj)
                // add to cart container creat element 
                let div = document.createElement("div")
                div.className = "addToCart d-flex gap-2 align-items-center px-2"
                div.innerHTML = `
                <div> <img
                src="${DBSproductObj.img}"
                alt=""></div>
                <div>
                <h5 class="addName">${DBSproductObj.name}</h5>
                <span class="addCatergory">${DBSproductObj.catagory}</span>
                <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                <input class="addCount" type="text" value="${DBSproductObj.count}" min="1" max="5">
                <div>
                <button class="incress">+</button>
                <button class="decress">-</button>
                </div>
                </div>
                <p class="addAmount" data-price ="${DBSproductObj.rate}">${DBSproductObj.rate}</p>
                </div>
                <i class="addRemove fa-solid fa-trash" style="color: #ff0000;"></i>
                </div>`
                addToCartContainer.append(div)

                // total amount
                let cartAmounts = document.querySelectorAll(".addToCartContainer .addAmount")
                let totalAmt = 0
                cartAmounts.forEach((cartAmt) => {
                    let amount = cartAmt.innerHTML.replace("₹", "")
                    totalAmt += parseInt(amount)
                })
                let cartAmount = document.querySelector(".cartAmount")
                cartAmount.innerHTML = `₹ ${totalAmt}`
            }

        }

        localStorage.setItem("addToCart", JSON.stringify(DBSproductArray))

        let addTocartCount = document.querySelector("#addTocartCount")
        let addTocartLength = JSON.parse(localStorage.getItem("addToCart")).length
        addTocartCount.innerHTML = Number(addTocartLength)

    })
    let allfeaturedProducts = document.querySelector(".allfeaturedProducts")
    allfeaturedProducts.addEventListener("click", (e) => {
        if (e.target.classList.contains("addToCartFP")) {
            let div = e.target.parentElement.parentElement.parentElement.parentElement

            let fpName = div.querySelector(".fdName")
            let fpRate = div.querySelector(".fdRate")
            let fpimg = div.querySelector(".fdImg")
            let fpCatagory = div.querySelector(".fdCatagory")

            let DBSproductObj = {
                name: fpName.innerHTML,
                rate: fpRate.innerHTML,
                img: fpimg.src,
                catagory: fpCatagory.innerHTML,
                count: 1,
            }

            console.log(DBSproductObj);
            let allReady = DBSproductArray.some((item) => item.name === DBSproductObj.name)

            if (allReady) {
                alert("All Ready Have in Add to Cart")
            }
            else {
                DBSproductArray.push(DBSproductObj)
                // add to cart container creat element 
                let div = document.createElement("div")
                div.className = "addToCart d-flex gap-2 align-items-center px-2"
                div.innerHTML = `
                <div> <img
                src="${DBSproductObj.img}"
                alt=""></div>
                <div>
                <h5 class="addName">${DBSproductObj.name}</h5>
                <span class="addCatergory">${DBSproductObj.catagory}</span>
                <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                <input class="addCount" type="number" value="${DBSproductObj.count}" min="1" max="5">
                <div>
                <button class="incress">+</button>
                <button class="decress">-</button>
                </div>
                </div>
                <p class="addAmount" data-price = "${DBSproductObj.rate}">${DBSproductObj.rate}</p>
                </div>
                <i class="addRemove fa-solid fa-trash" style="color: #ff0000;"></i>
                </div>`
                addToCartContainer.append(div)

                // total amount
                let cartAmounts = document.querySelectorAll(".addToCartContainer .addAmount")
                let totalAmt = 0
                cartAmounts.forEach((cartAmt) => {
                    let amount = cartAmt.innerHTML.replace("₹", "")
                    totalAmt += parseInt(amount)
                })
                let cartAmount = document.querySelector(".cartAmount")
                cartAmount.innerHTML = `₹ ${totalAmt}`
            }
            localStorage.setItem("addToCart", JSON.stringify(DBSproductArray))

            let addTocartCount = document.querySelector("#addTocartCount")
            let addTocartLength = JSON.parse(localStorage.getItem("addToCart")).length
            addTocartCount.innerHTML = Number(addTocartLength)

        }
        else if (e.target.classList.contains("addToCartFP2")) {
            let div = e.target.parentElement.parentElement.parentElement.parentElement.parentElement

            let fpName = div.querySelector(".fdName")
            let fpRate = div.querySelector(".fdRate")
            let fpimg = div.querySelector(".fdImg")
            let fpCatagory = div.querySelector(".fdCatagory")

            let DBSproductObj = {
                name: fpName.innerHTML,
                rate: fpRate.innerHTML,
                img: fpimg.src,
                catagory: fpCatagory.innerHTML,
                count: 1,
            }

            // console.log(DBSproductObj);
            let allReady = DBSproductArray.some((item) => item.name === DBSproductObj.name)

            if (allReady) {
                alert("All Ready Have in Add to Cart")
            }
            else {
                DBSproductArray.push(DBSproductObj)
                // add to cart container creat element 
                let div = document.createElement("div")
                div.className = "addToCart d-flex gap-2 align-items-center px-2"
                div.innerHTML = `
                <div> <img
                src="${DBSproductObj.img}"
                alt=""></div>
                <div>
                <h5 class="addName">${DBSproductObj.name}</h5>
                <span class="addCatergory">${DBSproductObj.catagory}</span>
                <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                <input class="addCount" type="number" value="${DBSproductObj.count}" min="1" max="5">
                <div>
                <button class="incress">+</button>
                <button class="decress">-</button>
                </div>
                </div>
                <p class="addAmount" data-price = "${DBSproductObj.rate}">${DBSproductObj.rate}</p>
                </div>
                <i class="addRemove fa-solid fa-trash" style="color: #ff0000;"></i>
                </div>`
                addToCartContainer.append(div)

                // total amount
                let cartAmounts = document.querySelectorAll(".addToCartContainer .addAmount")
                let totalAmt = 0
                cartAmounts.forEach((cartAmt) => {
                    let amount = cartAmt.innerHTML.replace("₹", "")
                    totalAmt += parseInt(amount)
                })
                let cartAmount = document.querySelector(".cartAmount")
                cartAmount.innerHTML = `₹ ${totalAmt}`
            }
            localStorage.setItem("addToCart", JSON.stringify(DBSproductArray))

            let addTocartCount = document.querySelector("#addTocartCount")
            let addTocartLength = JSON.parse(localStorage.getItem("addToCart")).length
            addTocartCount.innerHTML = Number(addTocartLength)

        }

    })



}
addToCartinContainer()


function localStorageAddToCart() {
    let localStorageAddToCartArr = JSON.parse(localStorage.getItem("addToCart")) || []
    DBSproductArray = localStorageAddToCartArr;
    // console.log(DBSproductArray);

    localStorageAddToCartArr.forEach((addToCartArr) => {
        let addToCartTotal = addToCartArr.count * addToCartArr.rate.replace("₹", "")
        // console.log(addToCartTotal);

        let div = document.createElement("div")
        div.className = "addToCart d-flex gap-2 align-items-center px-2"
        div.innerHTML = `
                <div> <img
                src="${addToCartArr.img}"
                alt=""></div>
                <div>
                <h5 class="addName">${addToCartArr.name}</h5>
    <span class="addCatergory">${addToCartArr.catagory}</span>
    <div class="d-flex justify-content-between">
        <div class="d-flex gap-2 align-items-center">
        <input class="addCount" readonly type="text" value="${addToCartArr.count}" min="1" max="5">
        <div>
        <button class="incress">+</button>
        <button class="decress">-</button>
        </div>
        </div>
        <p class="addAmount" data-price="${addToCartArr.rate}">₹${addToCartTotal}</p>
        </div>
        <i class="addRemove fa-solid fa-trash" style="color: #ff0000;"></i>
        </div>`
        // console.log(div);


        addToCartContainer.append(div)

        let addTocartCount = document.querySelector("#addTocartCount")


        addTocartCount.textContent = localStorageAddToCartArr.length

        addToCartCount()



    })

    function addToCartCount() {
        let addTocartCount = document.querySelector("#addTocartCount")
        addTocartCount.textContent = localStorageAddToCartArr.length
    }

}

function totalAmount() {
    let cartAmounts = document.querySelectorAll(".addToCartContainer .addAmount")
    let totalAmt = 0
    cartAmounts.forEach((cartAmt) => {
        // console.log(cartAmt);
        let amount = cartAmt.innerHTML.replace("₹", "")
        totalAmt += parseInt(amount)
    })
    let cartAmount = document.querySelector(".cartAmount")
    cartAmount.innerHTML = `₹ ${totalAmt}`
}
// totalAmount()
window.onload = () => {
    localStorageAddToCart()
    totalAmount()

    localStorageWishList()
}
function addToCartChanges() {
    addToCartContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("addRemove")) {
            let addToCartdiv = e.target.parentElement.parentElement
            let removeCartName = addToCartdiv.querySelector(".addName").textContent

            let localStorageAddToCartArr = JSON.parse(localStorage.getItem("addToCart")) || []
            localStorageAddToCartArr.forEach((addToCart, index) => {
                if (addToCart.name === removeCartName) {
                    localStorageAddToCartArr.splice(index, 1)
                    localStorage.setItem("addToCart", JSON.stringify(localStorageAddToCartArr))
                    addToCartdiv.remove()
                    DBSproductArray = localStorageAddToCartArr;
                }
            })
            let addTocartLength = JSON.parse(localStorage.getItem("addToCart")).length
            addTocartCount.innerHTML = Number(addTocartLength)

            totalAmount()
        }
        else if (e.target.classList.contains("incress")) {
            let addToCartdiv = e.target.parentElement.parentElement.parentElement.parentElement

            //incresing 
            let Count = addToCartdiv.querySelector(".addCount")
            Count.value++
            if (Count.value >= 5) {
                Count.value = 5
            }
            // giting price
            let amountEle = addToCartdiv.querySelector(".addAmount")
            let amount = amountEle.getAttribute("data-price")
            // let amount = amountEle.innerHTML

            // couveting to numbers
            let amt = parseFloat(amount.replace("₹", "").trim())
            console.log(amt);

            let total = amt * Count.value
            addToCartdiv.querySelector(".addAmount").innerHTML = `₹ ${total}`

            totalAmount()

            // updata in local storeage
            let incressName = addToCartdiv.querySelector(".addName").innerHTML

            let addToCartArrinLocal = JSON.parse(localStorage.getItem("addToCart"))
            addToCartArrinLocal.forEach((addToCart, index) => {
                if (addToCart.name === incressName) {
                    console.log(addToCartArrinLocal[index].count = Count.value);
                    localStorage.setItem("addToCart", JSON.stringify(addToCartArrinLocal))
                }
            })


        }
        else if (e.target.classList.contains("decress")) {
            let addToCartdiv = e.target.parentElement.parentElement.parentElement.parentElement
            //incresing 
            let Count = addToCartdiv.querySelector(".addCount")
            Count.value--

            if (Count.value <= 0) {
                Count.value = 1
            }
            // giting price
            let amountEle = (addToCartdiv.querySelector(".addAmount"));
            let amount = amountEle.getAttribute("data-price")
            // couveting to numbers
            let amt = parseFloat(amount.replace("₹", "").trim())
            let total = amt * Count.value
            addToCartdiv.querySelector(".addAmount").innerHTML = `₹ ${total}`

            totalAmount()

            // updata in local storeage
            let incressName = addToCartdiv.querySelector(".addName").innerHTML
            let addToCartArrinLocal = JSON.parse(localStorage.getItem("addToCart"))
            addToCartArrinLocal.forEach((addToCart, index) => {
                if (addToCart.name === incressName) {
                    console.log(addToCartArrinLocal[index].count = Count.value);
                    localStorage.setItem("addToCart", JSON.stringify(addToCartArrinLocal))
                }
            })
        }

    })
}
addToCartChanges()

addToCartContainer.addEventListener("click", () => {
    totalAmount()
    // console.log("change");

})

import {topSellsData,topRatedData,trendingItemsData,recentlyAddedData} from "./topSalesData.js";

let topSellsProducts = document.querySelector(".topSellsProducts")

topSellsData.forEach((data) => {
    let div = document.createElement("div")
    div.className = "tSProduct mb-4 d-flex gap-3 align-items-center"

    div.innerHTML = `
    <div class="topbg"><img src="${data.src}" alt=""></div>
    <div>
        <h4>${data.name}</h4>
        <img src="/Assets/top sell/rating.png" alt="">
        <div class="d-flex gap-2">
            <h5>₹${data.currentRate} </h5>
            <span>₹${data.mrp}</span>
        </div>
    </div>`
    topSellsProducts.appendChild(div)
})


// 
let topRatedProducts = document.querySelector(".topRatedProducts")

topRatedData.forEach((data) => {
    let div = document.createElement("div")
    div.className = "tSProduct mb-4 d-flex gap-3 align-items-center"

    div.innerHTML = `
    <div class="topbg"><img src="${data.src}" alt=""></div>
    <div>
        <h4>${data.name}</h4>
        <img src="/Assets/top sell/rating.png" alt="">
        <div class="d-flex gap-2">
            <h5>₹${data.currentRate} </h5>
            <span>₹${data.mrp}</span>
        </div>
    </div>`
    topRatedProducts.appendChild(div)
})

// 
let trendingItemsProducts = document.querySelector(".trendingItemsProducts")

trendingItemsData.forEach((data) => {
    let div = document.createElement("div")
    div.className = "tSProduct mb-4 d-flex gap-3 align-items-center"

    div.innerHTML = `
    <div class="topbg"><img src="${data.src}" alt=""></div>
    <div>
        <h4>${data.name}</h4>
        <img src="/Assets/top sell/rating.png" alt="">
        <div class="d-flex gap-2">
            <h5>₹${data.currentRate} </h5>
            <span>₹${data.mrp}</span>
        </div>
    </div>`
    trendingItemsProducts.appendChild(div)
})


// 
let recentlyAddedProducts = document.querySelector(".recentlyAddedProducts")

recentlyAddedData.forEach((data) => {
    let div = document.createElement("div")
    div.className = "tSProduct mb-4 d-flex gap-3 align-items-center"

    div.innerHTML = `
    <div class="topbg"><img src="${data.src}" alt=""></div>
    <div>
        <h4>${data.name}</h4>
        <img src="/Assets/top sell/rating.png" alt="">
        <div class="d-flex gap-2">
            <h5>₹${data.currentRate} </h5>
            <span>₹${data.mrp}</span>
        </div>
    </div>`
    recentlyAddedProducts.appendChild(div)
})

/////////////// slider
let ECleftSlide = document.querySelector("#ECleftSlide")
let ECrightSlide = document.querySelector("#ECrightSlide")
let exploreCategoriesProducteds = document.querySelector(".exploreCategoriesProducteds")

ECleftSlide.addEventListener("click", () => {
    exploreCategoriesProducteds.scrollBy({ left: -350, behavior: "auto" })
})

ECrightSlide.addEventListener("click", () => {
    exploreCategoriesProducteds.scrollBy({ left: 350, behavior: "smooth" })
})

function featuredProductslider() {
    let FPleftSlide = document.querySelector("#FPleftSlide")
    let FPrightSlide = document.querySelector("#FPrightSlide")
    let allfeaturedProducts = document.querySelector(".allfeaturedProducts")
    let featuredProduct = document.querySelector(".featuredProduct")

    let featuredProductWidth = featuredProduct.offsetWidth + 15
    // let featuredProductWidth = 300 + 14

    FPleftSlide.addEventListener("click", () => {
        allfeaturedProducts.scrollBy({ left: -`${featuredProductWidth * 2}`, behavior: "smooth" })
    })

    FPrightSlide.addEventListener("click", () => {
        allfeaturedProducts.scrollBy({ left: `${featuredProductWidth * 2}`, behavior: "smooth" })
    })
}


function dailyBestSellsSlider() {
    let DBSleftSlide = document.querySelector("#DBSleftSlide")
    let DBSrightSlide = document.querySelector("#DBSrightSlide")
    let dailyBestSellsAllProduct = document.querySelector(".dailyBestSellsAllProduct")
    let DBSproduct = document.querySelector(".DBSproduct")
    let DBSproductWidth = DBSproduct.offsetWidth + 15
    // console.log(DBSproductWidth);


    DBSleftSlide.addEventListener("click", () => {
        dailyBestSellsAllProduct.scrollBy({ left: `${-DBSproductWidth * 2}`, behavior: "smooth" })
    })

    DBSrightSlide.addEventListener("click", () => {
        dailyBestSellsAllProduct.scrollBy({ left: `${DBSproductWidth * 2}`, behavior: "smooth" })
    })
}

////////// Expires in
setInterval(() => {

    let currentDate = new Date()
    let day = currentDate.getDate() + 1
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()

    let expiresDataTime = new Date(`${month} ${day} ${year} 22:00:00`)

    let timeOut = expiresDataTime - currentDate
    //3491081

    // (82115815 / 1000 / 60 / 60) % 24)
    let currentHour = Math.floor((timeOut / 1000 / 60 / 60) % 24)
    let currentMin = Math.floor((timeOut / 1000 / 60) % 60)
    let currentSec = Math.floor((timeOut / 1000) % 60)

    let expHour = currentHour
    let expMin = currentMin
    let expSec = currentSec

    let hour = document.querySelector(".hour")
    let min = document.querySelector(".min")
    let sec = document.querySelector(".sec")

    hour.textContent = String(expHour).padStart(2, "0")
    min.textContent = String(expMin).padStart(2, "0")
    sec.textContent = String(expSec).padStart(2, "0")
}, 1000)

