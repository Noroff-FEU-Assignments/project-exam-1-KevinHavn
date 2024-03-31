export function showModal(src, captionText) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImage");
    let caption = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.setAttribute("alt",captionText)
    caption.textContent = captionText;

    let span = document.getElementById("closeModal");

    span.onclick = function() { 
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
