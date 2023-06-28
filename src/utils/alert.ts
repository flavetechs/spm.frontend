import Swal from 'sweetalert2'

class SweatAlert {
    static showSuccess(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    static showError(text: string, title: string) {
        Swal.fire({
            title,
            text,
            icon: 'error',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
}
export default SweatAlert;