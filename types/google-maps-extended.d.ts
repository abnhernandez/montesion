// Declaraciones de tipos para Google Maps Extended Component Library
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        key?: string;
        'solution-channel'?: string;
      };
      'gmpx-store-locator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'map-id'?: string;
        ref?: React.Ref<HTMLElement>;
      };
    }
  }

  interface Window {
    customElements: CustomElementRegistry;
  }
}

export {};
