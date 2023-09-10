export var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["ok"] = 200] = "ok";
    HttpStatusCode[HttpStatusCode["accepted"] = 202] = "accepted";
    HttpStatusCode[HttpStatusCode["created"] = 201] = "created";
    HttpStatusCode[HttpStatusCode["noContent"] = 204] = "noContent";
    HttpStatusCode[HttpStatusCode["badRequest"] = 400] = "badRequest";
    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
    HttpStatusCode[HttpStatusCode["notFound"] = 404] = "notFound";
    HttpStatusCode[HttpStatusCode["conflict"] = 409] = "conflict";
    HttpStatusCode[HttpStatusCode["unprocessableEntity"] = 422] = "unprocessableEntity";
    HttpStatusCode[HttpStatusCode["internalServerError"] = 500] = "internalServerError";
})(HttpStatusCode || (HttpStatusCode = {}));
