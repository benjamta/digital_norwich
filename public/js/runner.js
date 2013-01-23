$('#runTest').on('shown', function () {
	BOOMR.page_ready();

});

BOOMR.subscribe('before_beacon', function(o) {
	var html = "";

	//if(o.bw) { html += "Your bandwidth to this server is " + parseInt(o.bw/1024) + "kbps (&#x00b1;" + parseInt(o.bw_err*100/o.bw) + "%)<br>"; }
	//if(o.lat) { html += "Your latency to this server is " + parseInt(o.lat) + "&#x00b1;" + o.lat_err + "ms<br>"; }

    if(o.bw) {
        var bandwidth = parseInt(o.bw/1024);
        html += "Your bandwidth is: " + bandwidth + "kbps<br/><br/>";
    }

    html += '<div class="btn-group" data-toggle="buttons-radio">' +
            '<label>Would you pay for faster boradband if it was available?</label>'+
            '<button type="button" class="btn btn-primary">Yes</button>'+
            '<button type="button" class="btn btn-primary">No</button></div><br/><br />' +
            '<label>Would you like us to email you when faster boradband is available?</label>' +
            '<div class="input-prepend"><span class="add-on">email</span>' +
            '<input class="input-large" type="text" name="email" placeholder="name@address.co.uk" /></div>';

	var r = document.getElementById('results');
    r.innerHTML = html;

    var submitBtn = document.getElementById('submit-button-id');
    submitBtn.removeAttribute('disabled');
});     

BOOMR.init({
    autorun: false
});

// Function that will allow us to know if Ajax uploads are supported
function supportAjaxFormSubmit() {
    return supportFormData();

    // Is FormData supported?
    function supportFormData() {
        return !! window.FormData;
    }
}

// Actually confirm support
if (supportAjaxFormSubmit()) {
    // Ajax uploads are supported!

    // Init the Ajax form submission
    initFullFormAjaxSubmit();
} else {
    // TODO: Deal with regular submission
}

function initFullFormAjaxSubmit() {
    var form = document.getElementById('form-id');
    form.onsubmit = function() {
        // FormData receives the whole form
        var formData = new FormData(form);

        // We send the data where the form wanted
        var action = form.getAttribute('action');

        // Code common to both variants
        sendXHRequest(formData, action);
        // Avoid normal form submission
        return false;
    }
}

// Once the FormData instance is ready and we know
// where to send the data, the code is the same
// for both variants of this technique
function sendXHRequest(formData, uri) {
    // Get an XMLHttpRequest instance
    var xhr = new XMLHttpRequest();

    // Set up events
    xhr.addEventListener('readystatechange', onreadystatechangeHandler, false);

    // Set up request
    xhr.open('POST', uri, true);

    // Fire!
    xhr.send(formData);
}

function onreadystatechangeHandler(evt) {
    var status = null;

    try {
        status = evt.target.status;
    }
    catch(e) {
        return;
    }

    if (status == '200' && evt.target.responseText) {
        var r = document.getElementById('results');
        r.innerHTML = "Thank you - your record has been added to the database";

         // TODO: Throws exception
        var footer = document.getElementById('m-foot-id');
        footer.removeChild(document.getElementById('submit-button-id'));

        var cancelBtn = document.getElementById('cancel-button-id');
        cancelBtn.innerHTML = "Close";
        cancelBtn.setAttribute("class", "btn btn-success");
    }
}
