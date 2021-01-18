import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  test('renders profile image', () => {
    const { getByRole, queryByText, queryByRole } = render(
      <ProfileImage size="" />
    );
    const profileImage = getByRole('img');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.getAttribute('alt')).toEqual('profile');
    expect(profileImage.getAttribute('src')).toMatch(
      'my-starter-default-profile1.png?w=140&h=140'
    );
    const name = queryByText('starter');
    expect(name).not.toBeInTheDocument();
    const a = queryByRole('link');
    expect(a).not.toBeInTheDocument();
  });
  test('renders site logo small', () => {
    const { getByRole } = render(<ProfileImage size="small" />);
    const profileImage = getByRole('img');
    expect(profileImage.getAttribute('src')).toMatch(
      'my-starter-default-profile1.png?w=80&h=80'
    );
  });
  test('renders site logo name', () => {
    const { getByText } = render(<ProfileImage name />);
    const name = getByText('starter');
    expect(name).toBeInTheDocument();
  });
  test('renders site logo with link', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <ProfileImage link="/profile" />
      </RouterContext.Provider>
    );
    const a = getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a.getAttribute('href')).toEqual('/profile');
    fireEvent.click(a);
    expect(router.push).toHaveBeenCalledWith('/profile', '/profile', {
      locale: undefined,
      shallow: undefined
    });
  });
});
