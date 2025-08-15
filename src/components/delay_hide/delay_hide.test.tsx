/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { OuiDelayHide } from './index';

describe('when OuiDelayHide is visible initially', () => {
  function getWrapper() {
    jest.useFakeTimers();
    return render(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
  }

  test('it should be visible initially', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 900ms', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(900);
    });
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 1100ms', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.innerHTML).toEqual('');
  });

  test('it should be visible after 1100ms regardless of prop changes in-between', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should hide immediately after prop change, if it has been displayed for 1100ms', () => {
    const { container, rerender } = getWrapper();
    const currentTime = Date.now();
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    jest.spyOn(Date, 'now').mockReturnValue(currentTime + 1100);
    expect(container.innerHTML).toEqual('<div>Hello World</div>');

    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.innerHTML).toEqual('');
  });
});

describe('when OuiDelayHide parent updates', () => {
  it('should still hide correctly', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    ); // simulate parent component re-rendering
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(container.innerHTML).toEqual('');
  });
});

describe('when OuiDelayHide is hidden initially', () => {
  function getWrapper() {
    jest.useFakeTimers();
    return render(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
  }

  test('it should be hidden initially', async () => {
    const { container } = getWrapper();
    expect(container.innerHTML).toEqual('');
  });

  test('it should become visible immediately after prop change', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should be visible for at least 1100ms before hiding', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(900);
    });

    expect(container.innerHTML).toEqual('<div>Hello World</div>');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.innerHTML).toEqual('');
  });
});

describe('when OuiDelayHide is visible initially and has a minimumDuration of 2000ms ', () => {
  function getWrapper() {
    jest.useFakeTimers();
    const result = render(
      <OuiDelayHide
        hide={false}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    result.rerender(
      <OuiDelayHide
        hide={true}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    return result;
  }

  test('it should be visible initially', async () => {
    const { container } = getWrapper();
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 1900ms', () => {
    const { container } = getWrapper();
    act(() => {
      jest.advanceTimersByTime(1900);
    });
    expect(container.innerHTML).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 2100ms', () => {
    const { container, rerender } = getWrapper();
    act(() => {
      jest.advanceTimersByTime(2100);
    });
    rerender(
      <OuiDelayHide
        hide={true}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    expect(container.innerHTML).toEqual('');
  });
});

describe('when OuiDelayHide has been visible and become hidden', () => {
  it('should still be visible for the minimum duration the second time', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender(
      <OuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    expect(container.innerHTML).toEqual('<div>Hello World</div>');

    act(() => {
      jest.advanceTimersByTime(1100);
    });
    rerender(
      <OuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    expect(container.innerHTML).toEqual('');
  });
});
