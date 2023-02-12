const customSelect = (parentWrapperClass, headClass, headActiveClass, listClass, listActiveClass, listItemClass, functionReturnSelect) => {
    const $wrapper = document.querySelector(parentWrapperClass);
    const $head = $wrapper.querySelector(headClass);
    const $list = $wrapper.querySelector(listClass);
    const $listItems = $wrapper.querySelectorAll(listItemClass);


    $head.textContent = $listItems[0].textContent // default
    $wrapper.addEventListener('click', e => {
        if (e.target.closest(headClass)) {
            $list.classList.toggle(listActiveClass.slice(1))
            $head.classList.toggle(headActiveClass.slice(1))
        }
        $listItems.forEach(item => {
            if (e.target.closest(listItemClass) === item) {
                $list.classList.toggle(listActiveClass.slice(1))
                $head.classList.toggle(headActiveClass.slice(1))
                $head.textContent = item.textContent
                functionReturnSelect(item);
            }
        })
    })
}

export default customSelect 