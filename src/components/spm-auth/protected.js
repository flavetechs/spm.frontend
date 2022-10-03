const Protected = (props) => {
    console.log('logged something');
    return <>{props.children}</>
}
export default Protected;