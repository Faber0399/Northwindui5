sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("appui5.controller.DetallesProductos", {
            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetallesProductos").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                const iProductId = oEvent.getParameter("arguments").productId;
                const oView = this.getView();
                oView.bindElement({
                    path: "/Products(" + iProductId + ")",
                    parameters: {
                        expand: "Supplier,Category"
                    },
                    events: {
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function () {
                            oView.setBusy(false);
                        }
                    }
                });
            },
            addToCart: function (oEvent) {
                MessageToast.show("Added to cart");
            },
            trimSuperfluousBytes: function (sVal) { // background info https://blogs.sap.com/2017/02/08/displaying-images-in-sapui5-received-from-the-northwind-odata-service/
                if (typeof sVal === "string") {
                    const sTrimmed = sVal.substring(104);
                    return "data:image/bmp;base64," + sTrimmed;
                }
                return sVal;
            }
        });
    });
