webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditRecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipesList_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_recipe_interface__ = __webpack_require__(841);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditRecipePage = (function () {
    function EditRecipePage(nvParams, actionSheetCtrl, alertCtrl, toastCtrl, recipeService, navCtrl) {
        this.nvParams = nvParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.recipeService = recipeService;
        this.navCtrl = navCtrl;
        this.mode = 'New';
        this.selectOptions = ['Easy', 'Medium', 'High', 'Only grandma'];
    }
    EditRecipePage.prototype.ngOnInit = function () {
        this.mode = this.nvParams.get('mode');
        if (this.mode == 'Edit') {
            this.recipe = this.nvParams.get('recipe');
            this.index = this.nvParams.get('index');
            console.log(this.recipe);
        }
        this.initializeForm();
    };
    EditRecipePage.prototype.onSubmit = function () {
        var value = this.recipeForm.value;
        console.log(value);
        var ingredients = [];
        if (value.ingredients.length > 0) {
            ingredients = value.ingredients.map(function (name) {
                return { name: name, amount: 1 };
            });
            console.log(ingredients);
        }
        var recipe = new __WEBPACK_IMPORTED_MODULE_4__modals_recipe_interface__["a" /* Recipe */](value.title, value.description, value.dificulty, ingredients);
        if (this.mode == 'New') {
            if (this.recipeService.addRecipe(recipe)) {
                var toast = this.toastCtrl.create({
                    message: 'Recipe ' + recipe.title + ' added!',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = this.toastCtrl.create({
                    message: 'Recipe ' + recipe.title + ' already added. Try editing!',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
            this.recipeForm.reset();
            this.navCtrl.pop();
        }
        else {
            this.recipeService.updateRecipe(this.index, recipe);
            var toast = this.toastCtrl.create({
                message: 'Recipe ' + recipe.title + ' updated!',
                duration: 2000,
                position: 'top',
                cssClass: "toast"
            });
            toast.present();
            this.recipeForm.reset();
            this.navCtrl.popToRoot();
        }
    };
    EditRecipePage.prototype.onManageIngredients = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Add Ingredient',
                    handler: function () {
                        console.log('Add');
                        _this.presentPrompt().present();
                    }
                },
                {
                    text: 'Remove Ingredients',
                    role: 'destructive',
                    handler: function () {
                        var fArray = _this.recipeForm.get('ingredients');
                        var len = fArray.length;
                        if (len > 0) {
                            for (var i = len - 1; i >= 0; i--) {
                                fArray.removeAt(i);
                            }
                            var toastCtrl = _this.toastCtrl.create({
                                message: 'All ingredients removed',
                                duration: 2000,
                                position: 'top'
                            });
                            toastCtrl.present();
                        }
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    EditRecipePage.prototype.presentPrompt = function () {
        var _this = this;
        return this.alertCtrl.create({
            title: 'Add New Item',
            subTitle: 'What is the item of the recipe?',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Milk'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        if (data.name.trim() == '' || data.name == null) {
                            var toastCtrl_1 = _this.toastCtrl.create({
                                message: 'Please enter a valid name',
                                duration: 2000,
                                position: 'top'
                            });
                            toastCtrl_1.present();
                            return;
                        }
                        var toastCtrl = _this.toastCtrl.create({
                            message: 'Item ' + data.name + ' added',
                            duration: 2000,
                            position: 'top'
                        });
                        toastCtrl.present();
                        _this.recipeForm.get('ingredients').push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](data.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
                    }
                }
            ]
        });
    };
    EditRecipePage.prototype.initializeForm = function () {
        var title = null;
        var description = null;
        var dificulty = 'Medium';
        var ingredients = [];
        if (this.mode == 'Edit') {
            title = this.recipe.title;
            description = this.recipe.description;
            dificulty = this.recipe.dificulty;
            if (this.recipe.items.length > 0) {
                for (var _i = 0, _a = this.recipe.items; _i < _a.length; _i++) {
                    var ingredient = _a[_i];
                    ingredients.push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](ingredient.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
                }
            }
        }
        this.recipeForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            'title': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](title, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'description': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'dificulty': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](dificulty, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'ingredients': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormArray */](ingredients)
        });
    };
    Object.defineProperty(EditRecipePage.prototype, "formData", {
        get: function () {
            return this.recipeForm.get('ingredients');
        },
        enumerable: true,
        configurable: true
    });
    EditRecipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-recipe',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\edit-recipe\edit-recipe.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{ mode }} Recipe</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()" >\n    <ion-list>\n      <ion-item>\n          <ion-label floating>Title</ion-label>\n          <ion-input\n          type="text"\n          formControlName = "title"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Description</ion-label>\n          <ion-textarea\n          formControlName ="description"></ion-textarea>\n      </ion-item>\n        <ion-item>\n            <ion-label floating>Dificulty</ion-label>\n            <ion-select interface="action-sheet" formControlName="dificulty">\n              <ion-option *ngFor="let option of selectOptions" [value]="option"> {{option}} </ion-option>\n            </ion-select>\n          </ion-item>\n    </ion-list>\n    <button ion-button type="button" block clear (click)="onManageIngredients()" >Manage Ingredients</button>\n    <ion-list-header >List of Ingredients</ion-list-header>\n    <ion-list formArrayName="ingredients">\n          <ion-item\n          *ngFor="let igControl of formData.controls; let i = index" >\n              <ion-label floating>Name</ion-label>\n              <ion-input  type="text"[formControlName]="i"></ion-input>\n          </ion-item>\n    </ion-list>\n    <button ion-button type="submit" block [disabled]="!recipeForm.valid">{{ mode }} Recipe</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\edit-recipe\edit-recipe.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__services_recipesList_service__["a" /* RecipesService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], EditRecipePage);
    return EditRecipePage;
}());

//# sourceMappingURL=edit-recipe.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RecipesService = (function () {
    function RecipesService(http, AuthService) {
        this.http = http;
        this.AuthService = AuthService;
        this.recipesList = [];
    }
    RecipesService.prototype.addRecipe = function (recipe) {
        if (this.recipesList.length == 0) {
            this.recipesList.push(recipe);
            console.log(this.recipesList);
            return true;
        }
        else {
            var pos = this.recipesList.findIndex(function (recipeEl) {
                return recipeEl.title == recipe.title;
            });
            console.log(pos);
            if (pos == -1) {
                this.recipesList.push(recipe);
                console.log(this.recipesList);
            }
            else {
                return false;
            }
            return true;
        }
    };
    RecipesService.prototype.getRecipes = function () {
        console.log(this.recipesList);
        return this.recipesList.slice();
    };
    RecipesService.prototype.updateRecipe = function (index, recipe) {
        this.recipesList[index] = recipe;
    };
    RecipesService.prototype.removeRecipe = function (index) {
        this.recipesList.splice(index, 1);
    };
    RecipesService.prototype.storeRecipe = function (token) {
        var userId = this.AuthService.getActiveUser().uid;
        return this.http
            .put('https://ionic2-shoppinglist-1b87a.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token, this.recipesList)
            .map(function (response) {
            return response.json();
        });
    };
    RecipesService.prototype.fecthList = function (token) {
        var _this = this;
        var userId = this.AuthService.getActiveUser().uid;
        return this.http.get('https://ionic2-shoppinglist-1b87a.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token)
            .map(function (response) {
            return response.json();
        }).do(function (data) {
            if (data) {
                _this.recipesList = data;
            }
            else {
                _this.recipesList = [];
            }
        });
    };
    RecipesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]])
    ], RecipesService);
    return RecipesService;
}());

//# sourceMappingURL=recipesList.service.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = (function () {
    function SignupPage(firebaseService, loadingCtrl, alertCtrl, toastCtrl) {
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Signing you up...',
            spinner: 'dots'
        });
        loading.present();
        this.firebaseService.signup(form.value.email, form.value.password)
            .then(function (data) {
            loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Welcome ' + data.email + ' to the recipe paradise!',
                position: 'top',
                duration: 2000
            });
            toast.present();
        }).catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Signup failed!',
                message: error.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\signup\signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n      <!-- <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons> -->\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSignup(f)" >\n    <ion-list>\n      <h2 class="headertext">Register</h2>\n        <ion-item>\n            <ion-label stacked>Complete Name</ion-label>\n            <ion-input\n            type="text"\n            ngModel\n            name="name"\n            required\n            placeholder="Example Last"></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-label stacked>Username</ion-label>\n              <ion-input\n              type="text"\n              ngModel\n              name="username"\n              required\n              placeholder="exampleuser01"></ion-input>\n            </ion-item>\n      <ion-item>\n        <ion-label stacked>E-Mail</ion-label>\n        <ion-input\n        type="email"\n        ngModel\n        name="email"\n        required\n        placeholder="example@example.com"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label stacked>Password</ion-label>\n          <ion-input\n          type="password"\n          ngModel\n          name="password"\n          required\n          [minlength]="6"\n          placeholder="Must have 6 characters"></ion-input>\n        </ion-item>\n    </ion-list>\n    <button ion-button block type="submit" [disabled]="!f.valid">Signup</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 205;

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 250;

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shopping_list_shopping_list__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipes_recipes__ = __webpack_require__(429);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPage = (function () {
    function TabsPage() {
        this.tabRoot1 = __WEBPACK_IMPORTED_MODULE_1__shopping_list_shopping_list__["a" /* ShoppingListPage */];
        this.tabRoot2 = __WEBPACK_IMPORTED_MODULE_2__recipes_recipes__["a" /* RecipesPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab tabTitle="Shopping List" [root]="tabRoot1" tabIcon="list-box"></ion-tab>\n  <ion-tab tabTitle="Recipes" [root]="tabRoot2" tabIcon="book"></ion-tab>\n\n</ion-tabs>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\tabs\tabs.html"*/,
        })
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shoppingList_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sl_options_sl_options__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShoppingListPage = (function () {
    function ShoppingListPage(navCtrl, slServie, toast, authService, popoverCtrl, loading, alertCtrl) {
        this.navCtrl = navCtrl;
        this.slServie = slServie;
        this.toast = toast;
        this.authService = authService;
        this.popoverCtrl = popoverCtrl;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.done = false;
        this.getItems();
    }
    ShoppingListPage.prototype.onAddItem = function (form, name, amount) {
        if (name === void 0) { name = 'none'; }
        if (amount === void 0) { amount = 1234567; }
        console.log('add');
        var toast;
        if (name == 'none' && amount == 1234567) {
            var added = this.slServie.addItemtoShoppingList(form.value.ingredientName, Number(form.value.amount));
            if (added) {
                toast = this.toast.create({
                    message: 'Your item was added!',
                    duration: 1500,
                    position: 'button'
                });
            }
            else {
                toast = this.toast.create({
                    message: 'Your item is already added!',
                    duration: 2000,
                    position: 'button'
                });
            }
            form.reset();
        }
        else {
            var added = this.slServie.addItemtoShoppingList(name, amount);
            if (added) {
                toast = this.toast.create({
                    message: 'Your item was added!',
                    duration: 1500,
                    position: 'button'
                });
            }
            else {
                toast = this.toast.create({
                    message: 'Your item is already added!',
                    duration: 2000,
                    position: 'button'
                });
            }
        }
        toast.present();
        this.getItems();
    };
    ShoppingListPage.prototype.ionViewWillEnter = function () {
        this.getItems();
        if (!this.done) {
            this.getActiveUsers();
            this.done = true;
        }
    };
    ShoppingListPage.prototype.getItems = function () {
        this.items = this.slServie.getShoppingList();
    };
    ShoppingListPage.prototype.showItem = function (i) {
        console.log('Show Items');
    };
    ShoppingListPage.prototype.getActiveUsers = function () {
        var _this = this;
        this.authService.getActiveUser().getIdToken().then(function (token) {
            _this.slServie.fecthList(token)
                .subscribe(function (list) {
                if (list) {
                    _this.items = list;
                    var toast = _this.toast.create({
                        message: 'Your items hava been loaded! (' + _this.items.length + ')',
                        duration: 2000,
                        position: 'button'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toast.create({
                        message: 'You have no items, add a few and save it!',
                        duration: 2000,
                        position: 'button'
                    });
                    toast.present();
                    _this.items = [];
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    ShoppingListPage.prototype.isItemsEmpty = function () {
        return this.items.length == 0 ? true : false;
    };
    ShoppingListPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__sl_options_sl_options__["a" /* SLOptionsPage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (data != null) {
                if (data.action == 'added') {
                    _this.getItems();
                }
                else {
                    if (data.action == 'load') {
                        var loading_1 = _this.loading.create({
                            content: 'Loading your items...',
                            spinner: 'bubbles'
                        });
                        loading_1.present();
                        _this.authService.getActiveUser().getIdToken().then(function (token) {
                            _this.slServie.fecthList(token)
                                .subscribe(function (list) {
                                if (list) {
                                    _this.items = list;
                                    var toast = _this.toast.create({
                                        message: 'Your items hava been loaded! (' + _this.items.length + ')',
                                        duration: 2000,
                                        position: 'button'
                                    });
                                    toast.present();
                                }
                                else {
                                    var toast = _this.toast.create({
                                        message: 'You have no items, add a few and save it!',
                                        duration: 2000,
                                        position: 'button'
                                    });
                                    toast.present();
                                    _this.items = [];
                                }
                            }, function (error) {
                                console.log(error);
                                _this.handleErrors(error.json().error);
                            });
                            loading_1.dismiss();
                        });
                        console.log(data);
                    }
                    else {
                        var loading = _this.loading.create({
                            content: 'Saving your items...',
                            spinner: 'bubbles'
                        });
                        loading.present();
                        _this.authService.getActiveUser().getIdToken().then(function (token) {
                            console.log(token);
                            _this.slServie.storeList(token)
                                .subscribe(function () {
                                console.log('Success');
                                var toast = _this.toast.create({
                                    message: 'Success, your list is save online!',
                                    duration: 2000,
                                    position: 'button'
                                });
                                toast.present();
                            }, function (error) {
                                _this.handleErrors(error.json().error);
                                var toast = _this.toast.create({
                                    message: 'Sorry, something went wrong, try again!',
                                    duration: 2000,
                                    position: 'button'
                                });
                                toast.present();
                                ;
                            });
                        });
                        loading.dismiss();
                    }
                }
            }
        });
    };
    ShoppingListPage.prototype.removeItem = function (i) {
        console.log('Im removing the item' + i);
        this.slServie.removeItem(i);
        this.getItems();
    };
    ShoppingListPage.prototype.swipeEvent = function (event, i, mode) {
        // if(event.direction == 4 && event.distance >= 125 && mode =='item'){
        //    this.removeItem(i);
        //   console.log(event);
        // }
        if (event.direction == 2 && event.distance >= 100 && mode == 'item') {
            this.showItem(i);
            console.log(event);
        }
        else {
            if (event.direction == 2 && event.distance >= 150 && mode == 'changePage') {
                console.log('swipe');
                this.navCtrl.parent.select(1);
            }
        }
    };
    ShoppingListPage.prototype.handleErrors = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occurred!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    ShoppingListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shopping-list',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\shopping-list\shopping-list.html"*/'<!--\n  Generated template for the ShoppingListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>Shopping List</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="onShowOptions($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n      <!-- <button ion-button icon-only *ngIf="!isItemsEmpty()" (click)="showPrompt()">\n        <ion-icon name="add"></ion-icon>\n      </button> -->\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="main-content" (swipe)="swipeEvent($event, 0, \'changePage\')">\n  <form *ngIf="isItemsEmpty()"  #f="ngForm" (ngSubmit)="onAddItem(f)" >\n    <ion-list >\n      <ion-item>\n        <ion-label fixed>Name</ion-label>\n        <ion-input\n        type="text"\n        name="ingredientName"\n        placeholder="Milk"\n        ngModel\n        required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label fixed>Amount</ion-label>\n        <ion-input\n        type="number"\n        name="amount"\n        placeholder="2"\n        ngModel\n        required></ion-input>\n      </ion-item>\n    </ion-list>\n    <button ion-button type="submit" block [disabled]="!f.valid">\n        <i class="fa fa-plus-square" aria-hidden="true"></i>\n        <div class="textInButton">Add</div>\n      </button>\n  </form>\n  <ion-list>\n    <ion-list-header>List Of Items</ion-list-header>\n    <ion-item-sliding #slidingItem *ngFor="let item of items; let i = index" (swipe)="swipeEvent($event, i, \'item\')">\n        <ion-item  (click)="showItem(i)">\n            {{item.name}} ({{item.amount}})\n         </ion-item>\n         <ion-item-options side= "left">\n            <button  ion-button small color="primary" (click)="removeItem(i)">\n                <i class="fa fa-trash" aria-hidden="true"></i> Remove\n              </button>\n        </ion-item-options>\n        <ion-item-options side= "right">\n            <button  ion-button color="secondary" (click)="showItem(i)">\n                <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit\n              </button>\n        </ion-item-options>\n      </ion-item-sliding>\n\n  </ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\shopping-list\shopping-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__services_shoppingList_service__["a" /* ShoppingListService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], ShoppingListPage);
    return ShoppingListPage;
}());

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SLOptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shoppingList_service__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SLOptionsPage = (function () {
    function SLOptionsPage(viewCtrl, alertCtrl, slServie) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.slServie = slServie;
    }
    SLOptionsPage.prototype.onAction = function (action) {
        this.viewCtrl.dismiss({ action: action });
    };
    SLOptionsPage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add new Item',
            message: "Enter a name for this new item you're so keen on adding",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Milk'
                },
                {
                    name: 'amount',
                    type: 'number',
                    placeholder: '3'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        if (data.name && data.amount) {
                            _this.viewCtrl.dismiss({ action: 'added' });
                            _this.slServie.addItemtoShoppingList(data.name, data.amount);
                        }
                        else {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Add valid data',
                                message: 'Add the name and the amount please',
                                buttons: ['Dismiss']
                            });
                            alert_1.present();
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    SLOptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sl-options',
            template: "\n  <ion-grid text-center>\n  <ion-row>\n    <ion-col >\n      <h3>Store & Load</h3>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n      <button ion-button outline (click)=\"showPrompt()\">\n        <ion-icon name=\"add-circle\"></ion-icon>\n        <div style=\"padding-left: 10px;\">Add New</div>\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n      <button ion-button outline (click)=\"onAction('load')\">\n          <ion-icon name=\"cloud-download\"></ion-icon>\n        <div style=\"padding-left: 10px;\">Load</div>\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n\n      <button ion-button outline (click)=\"onAction('store')\">\n      <ion-icon name=\"cloud-circle\"></ion-icon>\n      <div style=\"padding-left: 10px;\">Save</div>\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_shoppingList_service__["a" /* ShoppingListService */]])
    ], SLOptionsPage);
    return SLOptionsPage;
}());

//# sourceMappingURL=sl-options.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipesList_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe_recipe__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sl_options_sl_options_recipes__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RecipesPage = (function () {
    function RecipesPage(navCtrl, recipeService, alertCtrl, loading, popoverCtrl, authService, toast) {
        this.navCtrl = navCtrl;
        this.recipeService = recipeService;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.toast = toast;
        this.recipeList = this.recipeService.getRecipes();
    }
    RecipesPage.prototype.addRecipe = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'New' });
    };
    RecipesPage.prototype.onLoadRecipe = function (recipe, index) {
        console.log(recipe);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__recipe_recipe__["a" /* RecipePage */], { recipe: recipe, index: index });
    };
    RecipesPage.prototype.swipe = function (event) {
        console.log('Hi');
        if (event.direction === 4) {
            this.navCtrl.parent.select(0);
        }
    };
    RecipesPage.prototype.ionViewWillEnter = function () {
        console.log('viewwill');
        this.recipeList = this.recipeService.getRecipes();
    };
    RecipesPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__sl_options_sl_options_recipes__["a" /* SLOptionsRecipePage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (data != null) {
                if (data.action == 'added') {
                    console.log('Refresh Page, Added');
                }
                else {
                    if (data.action == 'load') {
                        var loading_1 = _this.loading.create({
                            content: 'Loading your recipes...',
                            spinner: 'bubbles'
                        });
                        loading_1.present();
                        _this.authService.getActiveUser().getIdToken().then(function (token) {
                            _this.recipeService.fecthList(token)
                                .subscribe(function (list) {
                                if (list) {
                                    _this.recipeList = list;
                                    var toast = _this.toast.create({
                                        message: 'Your recipes hava been loaded! (' + _this.recipeList.length + ')',
                                        duration: 2000,
                                        position: 'button'
                                    });
                                    toast.present();
                                }
                                else {
                                    var toast = _this.toast.create({
                                        message: 'You have no recipes, add a few and save it!',
                                        duration: 2000,
                                        position: 'button'
                                    });
                                    toast.present();
                                    _this.recipeList = [];
                                }
                            }, function (error) {
                                console.log(error);
                                _this.handleErrors(error.json().error);
                            });
                            loading_1.dismiss();
                        });
                        console.log(data);
                    }
                    else {
                        var loading = _this.loading.create({
                            content: 'Saving your recipes...',
                            spinner: 'bubbles'
                        });
                        loading.present();
                        _this.authService.getActiveUser().getIdToken().then(function (token) {
                            console.log(token);
                            _this.recipeService.storeRecipe(token)
                                .subscribe(function () {
                                console.log('Success');
                                var toast = _this.toast.create({
                                    message: 'Success, your list is save online!',
                                    duration: 2000,
                                    position: 'button'
                                });
                                toast.present();
                            }, function (error) {
                                _this.handleErrors(error.json().error);
                                var toast = _this.toast.create({
                                    message: 'Sorry, something went wrong, try again!',
                                    duration: 2000,
                                    position: 'button'
                                });
                                toast.present();
                                ;
                            });
                        });
                        loading.dismiss();
                    }
                }
            }
        });
    };
    RecipesPage.prototype.handleErrors = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occurred!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    RecipesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recipes',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\recipes\recipes.html"*/'<!--\n  Generated template for the RecipesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-buttons start>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Recipes</ion-title>\n    <ion-buttons end>\n            <button ion-button icon-only (click)="onShowOptions($event)">\n              <ion-icon name="more"></ion-icon>\n            </button>\n        <!-- <button ion-button icon-only (click)="addRecipe()">\n          <ion-icon name="add"></ion-icon>\n        </button> -->\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div class="main-content" (swipe)="swipe($event)">\n  <ion-list>\n    <ion-list-header>List of Recipes</ion-list-header>\n    <button ion-item *ngFor="let recipe of recipeList; let i = index" (click)="onLoadRecipe(recipe,i)">\n      <h2> {{ recipe.title }}</h2>\n      <ion-note> {{ recipe.dificulty}}</ion-note>\n    </button>\n  </ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\recipes\recipes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_recipesList_service__["a" /* RecipesService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], RecipesPage);
    return RecipesPage;
}());

//# sourceMappingURL=recipes.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shoppingList_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipesList_service__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RecipePage = (function () {
    function RecipePage(navParams, navCtrl, shopListService, toast, recipeService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.shopListService = shopListService;
        this.toast = toast;
        this.recipeService = recipeService;
    }
    RecipePage.prototype.onAddIngredients = function () {
        this.shopListService.addItems(this.recipe.items);
        console.log(this.shopListService.getShoppingList());
        this.navCtrl.popToRoot();
        this.navCtrl.parent.select(0);
        var toast = this.toast.create({
            message: 'Items added to Shopping List!',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    RecipePage.prototype.onEdit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'Edit', recipe: this.recipe, index: this.index });
    };
    RecipePage.prototype.deleteRecipe = function () {
        this.recipeService.removeRecipe(this.index);
        var toast = this.toast.create({
            message: 'Recipe ' + this.recipe.title + ' removed',
            duration: 2000,
        });
        toast.present();
        this.navCtrl.popToRoot();
    };
    RecipePage.prototype.ionViewWillEnter = function () {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
    };
    RecipePage.prototype.ngOnInit = function () {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
        console.log(this.navParams.data);
    };
    RecipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recipe',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\recipe\recipe.html"*/'\n<ion-header>\n\n  <ion-navbar color = "primary">\n    <ion-title>{{recipe.title}} Recipe</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <h2>{{recipe.title}}</h2>\n        <div class="subTitle">Dificulty: {{recipe.dificulty}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-row >\n      <ion-col text-center>\n\n          <p>Description: {{recipe.description}}</p>\n      </ion-col>\n\n    </ion-row>\n    <ion-row>\n      <ion-col >\n        <ion-list>\n          <ion-list-header>List of Ingredients</ion-list-header>\n          <ion-item *ngFor="let item of recipe.items" >\n            {{item.name}}\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="recipe.items" >\n      <ion-col text-center>\n        <button ion-button clear block (click)="onAddIngredients()">Add Ingredients to Shopping List</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col >\n        <button ion-button outline block color ="secondary" (click)="onEdit()">Edit Recipe</button>\n      </ion-col>\n      <ion-col >\n        <button ion-button outline block (click)="deleteRecipe()">Delete Recipe</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\recipe\recipe.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_shoppingList_service__["a" /* ShoppingListService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__services_recipesList_service__["a" /* RecipesService */]])
    ], RecipePage);
    return RecipePage;
}());

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SLOptionsRecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SLOptionsRecipePage = (function () {
    function SLOptionsRecipePage(viewCtrl, alertCtrl, navCtrl) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    SLOptionsRecipePage.prototype.onAction = function (action) {
        this.viewCtrl.dismiss({ action: action });
    };
    SLOptionsRecipePage.prototype.addNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'New' });
        this.viewCtrl.dismiss({ action: 'added' });
    };
    SLOptionsRecipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sl-optionsrecipe',
            template: "\n  <ion-grid text-center>\n  <ion-row>\n    <ion-col >\n      <h3>Store & Load</h3>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n      <button ion-button outline (click)=\"addNew()\">\n        <ion-icon name=\"add-circle\"></ion-icon>\n        <div style=\"padding-left: 10px;\">Add New</div>\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n      <button ion-button outline (click)=\"onAction('load')\">\n          <ion-icon name=\"cloud-download\"></ion-icon>\n        <div style=\"padding-left: 10px;\">Load</div>\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col >\n\n      <button ion-button outline (click)=\"onAction('store')\">\n      <ion-icon name=\"cloud-circle\"></ion-icon>\n      <div style=\"padding-left: 10px;\">Save</div>\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], SLOptionsRecipePage);
    return SLOptionsRecipePage;
}());

//# sourceMappingURL=sl-options.recipes.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninPage = (function () {
    function SigninPage(firebaseService, loadingCtrl, alertCtrl, toastCtrl, navCtrl) {
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
    }
    SigninPage.prototype.onLogin = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Signing you in!!'
        });
        loading.present();
        this.firebaseService.signin(form.value.email, form.value.password).then(function (data) {
            loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Welcome back ' + data.email + '!',
                duration: 2500,
                position: 'top'
            });
            toast.present();
        }).catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Signin failed!',
                message: error.message,
                buttons: ['Ok']
            });
            alert.present();
            console.log(error);
        });
    };
    SigninPage.prototype.onSingUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\pages\signin\signin.html"*/'<!--\n  Generated template for the SigninPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <!-- <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons> -->\n    <ion-title>Signin</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onLogin(f)" >\n    <ion-list >\n      <ion-item>\n        <ion-label floating >Email or Username</ion-label>\n        <ion-input\n        type="text | email"\n        required\n        ngModel\n        name="email"\n        ></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating >Password</ion-label>\n          <ion-input\n          type="password"\n          required\n          ngModel\n          name="password"\n          ></ion-input>\n        </ion-item>\n    </ion-list>\n    <div class="something"></div>\n    <button class="buttonsSignIn" ion-button block type="submit" [disabled]="!f.valid">Login</button>\n  </form>\n  <div class="something"></div>\n  <button  class="buttonsSignIn"  ion-button block (click)="onSingUp()">Signup Now!</button>\n</ion-content>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\pages\signin\signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(438);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_edit_recipe_edit_recipe__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_recipe_recipe__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_recipes_recipes__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_shopping_list_shopping_list__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_shoppingList_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_recipesList_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_shopping_list_sl_options_sl_options__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_recipes_sl_options_sl_options_recipes__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recipe_recipe__["a" /* RecipePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_recipes_recipes__["a" /* RecipesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_shopping_list_sl_options_sl_options__["a" /* SLOptionsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_recipes_sl_options_sl_options_recipes__["a" /* SLOptionsRecipePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_17__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recipe_recipe__["a" /* RecipePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_recipes_recipes__["a" /* RecipesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_shopping_list_sl_options_sl_options__["a" /* SLOptionsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_recipes_sl_options_sl_options_recipes__["a" /* SLOptionsRecipePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__services_shoppingList_service__["a" /* ShoppingListService */],
                __WEBPACK_IMPORTED_MODULE_12__services_recipesList_service__["a" /* RecipesService */],
                __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);

var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.signup = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signin = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signOut();
    };
    AuthService.prototype.getActiveUser = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().currentUser;
    };
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_auth_service__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, firebaseService, toastCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.firebaseService = firebaseService;
        this.toastCtrl = toastCtrl;
        this.tabsPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.signInPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        this.signUpPage = __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */];
        this.isAuthenticated = false;
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp({
            apiKey: "AIzaSyA1LiSAPxIwJDzNx8T6Y24OWH91BUoA6UY",
            authDomain: "ionic2-shoppinglist-1b87a.firebaseapp.com",
            databaseURL: "https://ionic2-shoppinglist-1b87a.firebaseio.com",
            projectId: "ionic2-shoppinglist-1b87a",
            storageBucket: "ionic2-shoppinglist-1b87a.appspot.com",
            messagingSenderId: "527230502483"
        });
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuthenticated = true;
                _this.nav.setRoot(_this.tabsPage);
            }
            else {
                _this.isAuthenticated = false;
                _this.nav.setRoot(_this.signInPage);
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.onLoad = function (page) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    };
    MyApp.prototype.onLogOut = function () {
        this.firebaseService.logout();
        this.menuCtrl.close();
        var toast = this.toastCtrl.create({
            message: 'Logged Out! Comeback soon',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\IonicApps\ShoppingListApp\src\app\app.html"*/'<ion-menu [content]="nav">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list >\n      <button\n      ion-item\n      icon-left\n      (click)="onLoad(tabsPage)"\n      *ngIf="isAuthenticated" >\n        <ion-icon name="book"></ion-icon>\n        Recipe Book\n      </button>\n      <!-- <button ion-item icon-left (click)="onLoad(signInPage)" *ngIf="!isAuthenticated">\n        <ion-icon name="log-in"></ion-icon>\n        Signin\n      </button>\n      <button ion-item icon-left (click)="onLoad(signUpPage)" *ngIf="!isAuthenticated">\n        <ion-icon name="person"></ion-icon>\n        Signup\n      </button> -->\n      <button ion-item icon-left (click)="onLogOut()" *ngIf="isAuthenticated">\n          <ion-icon name="log-out"></ion-icon>\n          Logout\n        </button>\n\n    </ion-list>\n  </ion-content>\n</ion-menu>\n<ion-nav [root]="tabsPage" #nav></ion-nav>\n'/*ion-inline-end:"C:\IonicApps\ShoppingListApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
var Item = (function () {
    function Item(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    return Item;
}());

//# sourceMappingURL=item.interface.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Recipe; });
var Recipe = (function () {
    function Recipe(title, description, dificulty, items) {
        this.title = title;
        this.description = description;
        this.dificulty = dificulty;
        this.items = items;
    }
    return Recipe;
}());

//# sourceMappingURL=recipe.interface.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modals_item_interface__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShoppingListService = (function () {
    function ShoppingListService(http, AuthService) {
        this.http = http;
        this.AuthService = AuthService;
        this.shoppingList = [];
    }
    ShoppingListService.prototype.addItemtoShoppingList = function (name, amount) {
        this.shoppingList.push(new __WEBPACK_IMPORTED_MODULE_0__modals_item_interface__["a" /* Item */](name, amount));
        console.log(this.shoppingList);
        return true;
    };
    ShoppingListService.prototype.addItems = function (items) {
        (_a = this.shoppingList).push.apply(_a, items);
        var _a;
    };
    ShoppingListService.prototype.getShoppingList = function () {
        return this.shoppingList.slice();
    };
    ShoppingListService.prototype.removeItem = function (index) {
        this.shoppingList.splice(index, 1);
        console.log('I reamove the index');
    };
    ShoppingListService.prototype.storeList = function (token) {
        var userId = this.AuthService.getActiveUser().uid;
        return this.http
            .put('https://ionic2-shoppinglist-1b87a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.shoppingList)
            .map(function (response) {
            return response.json();
        });
    };
    ShoppingListService.prototype.fecthList = function (token) {
        var _this = this;
        var userId = this.AuthService.getActiveUser().uid;
        return this.http.get('https://ionic2-shoppinglist-1b87a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
            .map(function (response) {
            return response.json();
        }).do(function (data) {
            if (data) {
                _this.shoppingList = data;
            }
            else {
                _this.shoppingList = [];
            }
        });
    };
    ShoppingListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], ShoppingListService);
    return ShoppingListService;
}());

//# sourceMappingURL=shoppingList.service.js.map

/***/ })

},[433]);
//# sourceMappingURL=main.js.map