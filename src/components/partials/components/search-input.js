
export const SearchInput = (props) => {
   
    return (
        <input
            type="search"
            className="form-control text-lowercase"
            placeholder="Search..."
            onChange={(event) => props.setSearchQuery(event.target.value)}
        />
    )
}