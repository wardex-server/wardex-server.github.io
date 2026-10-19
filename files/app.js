new WOW().init();

$('#server').on('show.bs.modal', function (event) {
    $.request('onRenderServer', {
        data: {
            server_id: $(event.relatedTarget).data('server-id')
        },
        update: {
            server: '.server-modal'
        }
    });
});

function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    $.oc.flashMsg({
        'text': 'Скопировано',
        'class': 'info',
        'interval': 1.5
    })
}

var usernameInput = $('input[name="username"]')
    emailInput = $('input[name="email"]')

usernameInput.on('input', function () {
    $.cookie('username', $(this).val(), { expires: 7, path: '/' })
})

emailInput.on('input', function () {
    $.cookie('email', $(this).val(), { expires: 7, path: '/' })
})

var username = $.cookie('username')
    email = $.cookie('email')

if (username) {
    usernameInput.val(username)
}

if (email) {
    emailInput.val(email)
}

function setUsername(username) {
    const input = document.querySelector('[name="username"]');
    input.value = username;

    input.dispatchEvent(new Event('input', { bubbles: true }));
}
