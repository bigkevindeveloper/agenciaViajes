class controller {
    /*Controlador base*/
    constructor(res, req, next) {
        this.res = res;
        this.req = req;
        this.next = next;
    }
}

module.exports = controller;