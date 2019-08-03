document.addEventListener("DOMContentLoaded", function () {

    function createElem(elem) {
        return document.createElement(elem);
    }

    function appendElem(parent, elem) {
        return parent.appendChild(elem);
    }

    (function () {
        const usersList = document.querySelector('#users-list'),
            usersUrl = 'https://randomuser.me/api/?results=20';

        fetch(usersUrl)
            .then((rspns) => rspns.json())
            .then(function (data) {
                let users = data.results;
                return users.map(function (user) {
                    let li = createElem('li'),
                        img = createElem('img'),
                        sectionRow = createElem('section'),
                        name = createElem('div'),
                        address = createElem('div'),
                        age = createElem('div'),
                        pName = createElem('p'),
                        pAddress = createElem('p'),
                        pAge = createElem('p'),
                        closeBtn = createElem('span');
                    usersList.setAttribute('class', 'col-md-12');
                    li.setAttribute('class', 'row');
                    img.setAttribute('class', 'col-10 col-sm-8 col-md-2 col-lg-1');
                    sectionRow.setAttribute('class', 'col-md-10 row panel-sec');
                    name.textContent = 'Name:';
                    name.setAttribute('class', 'col-md-3 data-panel');
                    pName.setAttribute('class', 'u-name');
                    pAddress.setAttribute('class', 'u-address');
                    pAge.setAttribute('class', 'u-age');
                    address.textContent = 'Address:';
                    address.setAttribute('class', 'col-md-5 data-panel');
                    age.textContent = 'Age:';
                    age.setAttribute('class', 'col-md-1 data-panel');
                    img.src = user.picture.large;
                    pName.innerHTML = `${user.name.first} ${user.name.last} `;
                    pAddress.innerHTML = `${user.location.street}`;
                    pAge.innerHTML = ` ${user.dob.age}`;
                    closeBtn.textContent = '⨯';
                    closeBtn.setAttribute('class', 'close-btn');
                    appendElem(li, img);
                    appendElem(li, sectionRow);
                    appendElem(sectionRow, name);
                    appendElem(sectionRow, address);
                    appendElem(sectionRow, age);
                    appendElem(name, pName);
                    appendElem(address, pAddress);
                    appendElem(age, pAge);
                    appendElem(li, closeBtn);
                    appendElem(usersList, li);
                })
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });

    }());

    $('#users-list').on('click', '.close-btn', function () {
        $(this).parent('li').slideUp(200);
    });

    $('#input-search').keydown(function () {
        if ($('#user-name').is(':checked')) {
            $("#user-name").trigger("click");
        }
    });

    $('.form-wrap').on('click', '[name]', function () {

        let radioId = $(this).attr('id'),
            userCol;

        function filterUser(ud) {
            ud.parent('div').removeClass('d-none').siblings().addClass('d-none');
        }

        switch (radioId) {
            case 'user-name':
                userCol = '.u-name';
                $("li .u-name").each(function () {
                    filterUser($(this));
                });
                break;
            case 'user-address':
                userCol = '.u-address';
                $("li .u-address").each(function () {
                    filterUser($(this));
                });
                break;
            case 'user-age':
                userCol = '.u-age';
                $("li .u-age").each(function () {
                    filterUser($(this));
                });
                break;
            default:
        }

        $('#input-search').keyup(function () {
            searchData($(this).val());
        });

        function searchData(value) {
            $(userCol).each(function () {
                let found = 'false';

                $(this).each(function () {
                    if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                        found = 'true';
                    }
                });

                if (found === 'true') {
                    $(this).closest('li').show();
                } else {
                    $(this).closest('li').hide();
                }
            });
        }
    });

});

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
        loader.className += " d-none";
    }, 230);
});