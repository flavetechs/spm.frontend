import "./smp-loader.scss"
const SmpLoader = () => {

    return (
        <>
            <div class="overlay show"></div>
            <div class="spanner show">
                <div class="loader"></div>
                {/* <p>Uploading music file, please be patient.</p> */}
            </div>
        </>
    )
}

export default SmpLoader;