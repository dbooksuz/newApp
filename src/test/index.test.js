// it is test package and it is not used in the project
import { describe, it, expect } from 'vitest';  
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App'; // Adjust the import path as necessary
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useState } from 'react';
