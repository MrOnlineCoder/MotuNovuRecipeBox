export const Label: React.FC<{
    children?: React.ReactNode
    size: 'sm' | 'md' | 'lg'

}> = ({
    children
}) => {
        return <div>
            {children}
        </div>
    }