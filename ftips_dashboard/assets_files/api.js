function getChildIndex (element) {
  return Array.prototype.indexOf.call(element.parentNode.children, element);
}

function gatherData (id, fields) {
    let data = {};
    for (let field of fields) {
        let val = document.getElementById(id + '-' + field).innerText.trim();
        if (val) {
            let num = Number(val)
            data[field] = isNaN(num) ? val : num;
        } else
            data[field] = null;
    }
    return data;
}

function apiCall (method, endpoint, after_request, fields) {
    return (e, id) => {
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (httpRequest.status !== 200) {
                console.log("Failed AJAX")
                after_request(e, httpRequest.response, false);
                return;
            }
            after_request(e, httpRequest.response, true);
        };
        let final_endpoint = endpoint + (id || '');

        httpRequest.open(method, final_endpoint, true);
        httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        let data;
        if (typeof fields === 'function') {
            data = fields(e);
        } else if (fields) {
            if (method === 'DELETE') {
                data = null;
            } else if (method === 'POST') {
                data = gatherData('new', fields);
            } else {
                data = gatherData(id, fields);
            }
        }

        httpRequest.send(JSON.stringify(data));
    }
}

resendVerificationCode = apiCall('POST', '/api/resend_verification_code', (e, response, success) => {
    if (success) {
        let alternative_option_link = document.getElementById('alternative-option-link');
        alternative_option_link.href = '#';
        alternative_option_link.innerText = 'Code sent.';
    } else {
        alert('Failed to send verification code!');
    }
}, (e) => {
    let email = document.getElementById('email').value;
    return { email: email };
});

sendVerificationCode = apiCall('POST', '/api/send_verification_code', (e, response, success) => {
    if (success) {
        let hidden_elements = document.querySelectorAll('.hidden');
        for (let el of hidden_elements) {
            el.classList.remove('hidden');
        }
        let button = document.getElementById('submit');
        button.type = 'submit';
        button.onclick = '';
        let alternative_option = document.getElementById('alternative-option');
        alternative_option.innerText = "Didn't receive the code?"
        let alternative_option_link = document.getElementById('alternative-option-link');
        alternative_option_link.href = '#';
        alternative_option_link.innerText = 'Resend code';
        alternative_option.addEventListener('click', (e) => {
            e.preventDefault();
            resendVerificationCode(e);
        });
    } else {
        alert('Invalid email. Please try again, if the error persists - contact the administrator.');
    }
}, (e) => {
    let email = document.getElementById('email').value;
    return { email: email };
});

/*login = apiCall('POST', '/api/login', (e, response, success) => {
    if (success) {
        window.location.href = '/home';
    } else {
        response
    }
}*/


///// USERS /////

switchAccess = apiCall('PUT', '/api/access/', (e, res, success) => {
    if (!success) {
        e.target.checked = !e.target.checked;
    }
});

changeUser = apiCall('PUT', '/api/users/', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, ['credit']);

deleteUser = apiCall('DELETE', '/api/users/', (e, res, success) => {
    if (success) {
        e.target.parentNode.parentNode.remove();
    }
});


///// PACKS /////

addPack = apiCall('POST', '/api/packs', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, ['name', 'title', 'icon', 'link', 'stake']);

changePack = apiCall('PUT', '/api/packs/', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, ['name', 'title', 'icon', 'link', 'stake']);

deletePack = apiCall('DELETE', '/api/packs/', (e, res, success) => {
    if (success) {
        location.reload();
    }
});


///// CONDITIONS /////

addCondition = apiCall('POST', '/api/conditions', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, ['code']);

changeCondition = apiCall('PUT', '/api/conditions/', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, ['code']);

deleteCondition = apiCall('DELETE', '/api/conditions/', (e, res, success) => {
    if (success) {
        location.reload();
    }
});

switchSource = apiCall('PUT', '/api/sources/', (e, res, success) => {
    if (!success) {
        e.target.checked = !e.target.checked;
    }
});


///// BETS /////

addBet = apiCall('POST', '/api/bets', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, [
    'game_datetime', 'league', 'home_team', 'away_team',
    'home_score_ht', 'away_score_ht', 'home_score_ft', 'away_score_ft',
    'market', 'account', 'bot_name'
]);

changeBet = apiCall('PUT', '/api/bets/', (e, res, success) => {
    if (success) {
        location.reload();
    }
}, [
    'game_datetime', 'league', 'home_team', 'away_team',
    'home_score_ht', 'away_score_ht', 'home_score_ft', 'away_score_ft',
    'market', 'account', 'bot_name'
]);

deleteBet = apiCall('DELETE', '/api/bets/', (e, res, success) => {
    if (success) {
        location.reload();
    }
});

setUserMade = apiCall('PUT', '/api/amendments/made/', (e, res, success) => {
    if (!success) {
        e.target.checked = !e.target.checked;
    }
});

setUserOdd = apiCall('PUT', '/api/amendments/odd/', (e, res, success) => {
    if (success) {
        location.reload();
    } else {
        e.target.innerText = '';
    }
}, ['user_odd']);