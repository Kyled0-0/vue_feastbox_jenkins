import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'     // ⬅️ add this
import PaymentForm from '../PaymentForm.vue'


beforeEach(() => {
  setActivePinia(createPinia())
})

describe('PaymentForm.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(PaymentForm, {
      props: { msg: 'Hello Vitest!' }
    })
    expect(wrapper.text()).toContain('Purchase successfully')
  })
})
