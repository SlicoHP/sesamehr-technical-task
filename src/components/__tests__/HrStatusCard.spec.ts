import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HrStatusCard from '../HrStatusCard.vue'
import IconInbox from '@/components/icons/IconInbox.vue'
import IconConfetti from '@/components/icons/IconConfetti.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconBan from '@/components/icons/IconBan.vue'

describe('HrStatusCard', () => {
  it('muestra el texto de estado y el icono correctamente', () => {
    const wrapper = mount(HrStatusCard, {
      props: {
        status: 'New',
      },
    })

    expect(wrapper.find('[data-testid="status-text"]').text()).toContain('New')
    expect(wrapper.findComponent(IconInbox).exists()).toBe(true)
  })

  it('aplica la clase de fondo correcta basada en el estado', () => {
    const wrapper = mount(HrStatusCard, {
      props: {
        status: 'Accepted',
      },
    })

    expect(wrapper.find('.bg-teal-500').exists()).toBe(true)
  })

  it('emite on-drop event cuando ocurre un drop', async () => {
    const wrapper = mount(HrStatusCard, {
      props: {
        status: 'New',
      },
    })

    await wrapper.trigger('drop')
    expect(wrapper.emitted('on-drop')).toBeTruthy()
    expect(wrapper.emitted('on-drop')).toHaveLength(1)
  })

  it('muestra el contenido del slot', () => {
    const wrapper = mount(HrStatusCard, {
      props: {
        status: 'New',
      },
      slots: {
        default: '<div class="test-slot">Slot Content</div>',
      },
    })

    expect(wrapper.find('.test-slot').exists()).toBe(true)
    expect(wrapper.find('.test-slot').text()).toBe('Slot Content')
  })

  it.each([
    ['New', IconInbox, 'bg-green-500'],
    ['Accepted', IconUser, 'bg-teal-500'],
    ['Interview', IconConfetti, 'bg-blue-500'],
    ['Selected', IconConfetti, 'bg-blue-500'],
    ['Discarded', IconBan, 'bg-not-selected'],
  ])(
    'muestra el icono y la clase de fondo correcta para el estado %s',
    (status, icon, bgClass) => {
      const wrapper = mount(HrStatusCard, {
        props: { status },
      })

      expect(wrapper.findComponent(icon).exists()).toBe(true)
      expect(wrapper.find(`.${bgClass}`).exists()).toBe(true)
    },
  )
})
