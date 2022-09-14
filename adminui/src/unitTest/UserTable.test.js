import {  render  } from '@testing-library/react';
import  UserTable  from '../adminui/UserTable';
import React from "react";

test('renders UserTable component without crashing',  () => {
  render(<UserTable />);
});

