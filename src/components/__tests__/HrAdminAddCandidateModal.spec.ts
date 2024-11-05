import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HrAdminAddCandidateModal from '../HrAdminAddCandidateModal.vue'
import IconClose from '@/components/icons/IconClose.vue'
import type { CandidateStatus } from '@/domain/models/Candidate'

describe('HrAdminAddCandidateModal', () => {
  const mockCandidateStatuses = [
    { id: '1', name: 'New' },
    { id: '2', name: 'Accepted' },
  ]

  const createWrapper = (props = {}) => {
    return mount(HrAdminAddCandidateModal, {
      props: {
        candidateStatuses: mockCandidateStatuses as CandidateStatus[],
        mode: 'add',
        editCandidate: null,
        ...props,
      },
      global: {
        components: {
          'icon-close': IconClose,
        },
      },
    })
  }

  it('modo add titulo se muestra correctamente', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('[data-testid="form-title"]').text()).toContain(
      'Añadir candidato',
    )
  })

  it('modo edit titulo se muestra correctamente con datos del candidato', () => {
    const mockCandidate = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      statusId: '1',
      vacancyId: '123',
    }

    const wrapper = createWrapper({
      mode: 'edit',
      editCandidate: mockCandidate,
    })

    expect(wrapper.find('[data-testid="form-title"]').text()).toContain(
      'Editar candidato',
    )
    expect((wrapper.find('#firstname').element as HTMLInputElement).value).toBe(
      'John',
    )
    expect((wrapper.find('#surname').element as HTMLInputElement).value).toBe(
      'Doe',
    )
    expect((wrapper.find('#status').element as HTMLInputElement).value).toBe(
      '1',
    )
  })

  it('emite close event cuando se usa el icono de cerrar', async () => {
    const wrapper = createWrapper()
    await wrapper.find('[data-testid="close-icon"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('el boton se habilita cuando se rellenan los campos', async () => {
    const wrapper = createWrapper()
    const saveButton = wrapper.find('[data-testid="submit-button"]')
    expect(saveButton.attributes('disabled')).toBeDefined()

    await wrapper.find('#firstname').setValue('John')
    await wrapper.find('#surname').setValue('Doe')
    await wrapper.find('#status').setValue('1')

    expect(saveButton.attributes('disabled')).toBeUndefined()
  })

  it('emite addCandidate event con los datos del formulario en modo add', async () => {
    const wrapper = createWrapper()

    await wrapper.find('#firstname').setValue('John')
    await wrapper.find('#surname').setValue('Doe')
    await wrapper.find('#status').setValue('1')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('addCandidate')).toBeTruthy()
    expect(wrapper.emitted('addCandidate')[0][0]).toEqual({
      id: '',
      firstName: 'John',
      lastName: 'Doe',
      statusId: '1',
      vacancyId: '',
    })
  })
})
