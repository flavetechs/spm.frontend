import { errorModal } from "../store/actions/candidate-admission-actions";

export function ImageValidation(event,setFieldValue,imageParam,setImages) {
  console.log("size",event.target.files[0].size);
    var maxSize =  204800 //200kb
    if (
      event.target.files[0].size > maxSize
    ) {
      errorModal(
        "File size exceeds 200kb. Please choose a smaller file."
      );
      event.target.value = "";
      setFieldValue(
        imageParam,
          ""
        );
        setImages(null);
}
}