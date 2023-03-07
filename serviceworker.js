self.addEventListener("install", function (event) { event.waitUntil(preLoad());});

var filesToCache = [ '/', '/contact.html', '/offline.html'];

var preLoad = function () {
return caches.open("offline").then(function (cache) {
// caching index and important routes
return cache.addAll(filesToCache);
});
};

self.addEventListener('push', function (event) { if (event && event.data) {
    var data = event.data.json();
    if (data.method == "pushMessage") { console.log("Push notiﬁcation sent");
    event.waitUntil(self.showNotiﬁcation("Gaurang Mini Project", {body: data.message}))}
    }
})
    

var checkResponse = function (request) { return new Promise(function (fulfill, reject) {
fetch(request).then(function (response) { if (response.status !== 404) {
fulfill(response);
} else {
    reject();
    }
    }, reject);
    });
};

var addToCache = function (request) {
    return caches.open("offline").then(function (cache) { return fetch(request).then(function (response) {
    return cache.put(request, response);
    });
    });
};
    
var returnFromCache = function (request) {
    return caches.open("offline").then(function (cache) { return cache.match(request).then(function (matching) {
    if (!matching || matching.status == 404) { return cache.match("offline.html");
    } else {
    return matching;
    }
    });
    });
};
    
