import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import LayoutDefault from '~/layouts/default.vue'

describe('Layout Default', () => {
  it('Render Properly', async () => {
    await renderSuspended(LayoutDefault)
    expect(screen.getByText('Layout Default')).toBeDefined()
  })
})
