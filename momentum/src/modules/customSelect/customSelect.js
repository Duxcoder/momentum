const customSelect = (parentWrapperClass, headClass, headActiveClass, listClass, listActiveClass, listItemClass) => {
    const $wrapper = document.querySelector(parentWrapperClass);
    const $head = $wrapper.querySelector(headClass);
    const $list = $wrapper.querySelector(listClass);
    const $listItem = $wrapper.querySelector(listItemClass);

    $wrapper.addEventListener('click', e => {
        if (e.target.closest(headClass)) {
            $list.classList.toggle(listActiveClass.slice(1))
            $head.classList.toggle(headActiveClass.slice(1))
        }
    })


}

export default customSelect 