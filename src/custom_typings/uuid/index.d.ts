/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

declare module 'uuid' {
  type OutputBuffer = ArrayLike<number>;
  type InputBuffer = ArrayLike<number>;

  interface RandomOptions {
    random?: InputBuffer;
  }

  interface RngOptions {
    rng?: () => InputBuffer;
  }

  interface V1BaseOptions {
    node?: InputBuffer;
    clockseq?: number;
    msecs?: number | Date;
    nsecs?: number;
  }

  type V1Options = V1BaseOptions & (RandomOptions | RngOptions);
  type V4Options = RandomOptions | RngOptions;

  export function v1(options?: V1Options): string;
  export function v1<T extends OutputBuffer>(
    options: V1Options | null | undefined,
    buffer: T,
    offset?: number
  ): T;

  export function v4(options?: V4Options): string;
  export function v4<T extends OutputBuffer>(
    options: V4Options | null | undefined,
    buffer: T,
    offset?: number
  ): T;

  export function validate(uuid: string): boolean;
  export function version(uuid: string): number;
}
