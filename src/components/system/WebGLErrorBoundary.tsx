import React from "react";

type Props = {
    children: React.ReactNode;
    fallback: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export class WebGLErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown) {
        console.error("WebGL component crashed:", error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}