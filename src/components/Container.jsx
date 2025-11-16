const Container = ({children, className, id}) => {
    return (
        <div className={`px-4 lg:px-20  font-[Inter] min-w-full ${className}`} id={id}>
            {children}
        </div>
    )
}
export default Container