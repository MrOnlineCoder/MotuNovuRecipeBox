import { createPortal } from "react-dom"

export const FixedBottomRender: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return createPortal(
        children,
        document.getElementById('app-bottom-container') as HTMLElement
    );
}