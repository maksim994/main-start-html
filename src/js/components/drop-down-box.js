// Раскрывающийся блок
function expandBlock() {
    let dropDownBoxes = document.querySelectorAll('.js-drop-down-box');

    if (dropDownBoxes.length > 0) {
        dropDownBoxes.forEach(function(box) {
            let contentBox = box.querySelector('.drop-down-box__content');
            let boxMaxHeight = parseInt(box.dataset.height);
            let divider = box.querySelector('.drop-down-box__divider');

            if (contentBox) {
                if (boxMaxHeight) {
                    if (!divider) {
                        contentBox.style.maxHeight = boxMaxHeight + 'px';
                    }
                }

                if (divider) {
                    boxMaxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom);
                    contentBox.style.maxHeight = boxMaxHeight + 'px';
                }
            } else {
                box.insertAdjacentHTML('afterbegin', '<span class="error">Нечего разворачивать!</span>');
                // console.log('Нет контейнера под контент');
            }

            if (divider || boxMaxHeight) {
                if (!contentBox.nextElementSibling) {
                    let expandButton = document.createElement('a');
                    expandButton.classList.add('link');
                    expandButton.classList.add('link_arrow_down');
                    expandButton.classList.add('drop-down-box__link');
                    expandButton.innerHTML = 'Развернуть';
                    box.insertAdjacentElement('beforeend', expandButton);

                    expandButton.addEventListener('click', function(event){
                        event.preventDefault();

                        if (contentBox) {
                            box.classList.toggle('drop-down-box_expanded');
                            if (box.classList.contains('drop-down-box_expanded')) {
                                contentBox.style.maxHeight = contentBox.scrollHeight + 'px';
                                expandButton.innerHTML = 'Свернуть';
                                expandButton.classList.add('link_active'); // Под вопросом
                            } else {
                                contentBox.style.maxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom) + 'px';
                                expandButton.classList.remove('link_active'); // Под вопросом
                                expandButton.innerHTML = 'Развернуть';
                            }
                        }
                    });
                }

                window.addEventListener('resize', function() {
                    if (box.classList.contains('drop-down-box_expanded')) {
                        contentBox.style.maxHeight = contentBox.scrollHeight + 'px';
                    } else {
                        contentBox.style.maxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom) + 'px';
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    expandBlock();
});