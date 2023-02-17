import { render, screen } from '@testing-library/react';
import ApiStatus from './ApiStatus';

describe('<ApiStatus/>', () => {

    it('should render an error message if isApiDown=true', () => {
        render(<ApiStatus isApiDown={true}/>);

        expect(screen.getByText('Red - 500 errors detected. API might be down.')).toBeInTheDocument();
    });

    it('should render an success message if isApiDown=true', () => {
        render(<ApiStatus isApiDown={false}/>);

        expect(screen.getByText('Green - API working.')).toBeInTheDocument();
    });
});