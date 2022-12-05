<template>
 <b-container>
  <div>
   
    <div class="mt-5 contact-form">
      <form @submit.prevent="contacts">
        <div class="d-flex gap-4 py-3 rounded justify-content-center">
          <input
            class="py-3 px-2 bg-transparent text-sm form-group"
            style="width: 100%"
            v-model="contact.name"
            type="text"
            name="name"
            id="name"
            :placeholder="$t('global.name')"
          />
          <input
            class="py-3 px-2 bg-transparent focus:outline-none form-group"
            style="width: 100%"
            v-model="contact.email"
            type="email"
            name="email"
            id="email"
            :placeholder="$t('global.email')"
            variant="outline-success"
          />
        </div>
        <div class="py-3">
          <input
            class="py-3 px-2 bg-transparent focus:outline-none form-group"
            style="width: 100%"
            v-model="contact.subject"
            type="text"
            id="subject"
            name="subject"
            :placeholder="$t('global.enterSubject')"
          />
        </div>
        <div class="py-3">
          <textarea
            class="p-2 my-1 w-full bg-transparent h-40 form-group"
            style="width: 100%"
            v-model="contact.message"
            type="message"
            id="message"
            name="message"
            :placeholder="$t('contact.enterYourMessage')"
          >
          </textarea>
    <div class="send-btn">
          <SubmitBtn
            :label="$t('contact.send')"
            :loading="loading"
            class=" p-3 btn "
            className="btn-auth"
           position="center"
          />
        </div>
          <!-- <b-modal
            ref="my-modal"
            id="contact-send"
            title=""
            size="sm"
            class="base-modal"
            close-only
            hide-header
            hide-footer
            centered
          >
            <base-modal-content />
            <div class="text-center px-3 contact-send-modal">
              <img
                src="../../assets/images/icons/success.png"
                alt=""
                class="mb-3 modal-success"
              />
              <h6 class="message fw-bold">
                {{ $t('contact.messageHasBeenSended') }}
              </h6>
              <p class="font-weight-bold send-msg">
                {{ $t('contact.contactYouSoon') }}
              </p>
              <b-button
                class="my-2"
                variant="primary"
                block
                v-b-modal.contact-send
                >{{ $t('global.close') }}
              </b-button>
            </div>
          </b-modal> -->
          <div class="modal-contact">
            <MazDialog v-model="isOpen" class="contact-send-modal">
              <img
                src="@/assets/images/icons/success.png"
                alt=""
                class="mb-3 modal-success center-modal"
              />
              <h6 class="maz-text-center message">
                {{ $t('contact.messageHasBeenSended') }}
              </h6>
              <p class="send-msg text-center">
                {{ $t('contact.contactYouSoon') }}
              </p>

              <b-button
                @click="isOpen = false"
                variant="primary"
                class="center-modal mb-2"
              >
                {{ $t('global.close') }}</b-button
              >
            </MazDialog>
          </div>
        </div>
      </form>
    </div>


  </div>
</b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import contactsService from './contacts.service'
import MazDialog from 'maz-ui/components/MazDialog'

export default {
  name: 'ContactsPage',
  components: { MazDialog },
  data() {
    return {
      loading: false,
      isOpen: false,
      contact: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    }
  },
  methods: {
    contacts() {
      this.loading = true
      contactsService
        .create(this.contact)
        .then((response) => {
          this.loading = false
          core.showSnackbar('success', response.data.message)
          this.isOpen = true
          this.contact.name = ''
          this.contact.email = ''
          this.contact.subject = ''
          this.contact.message = ''
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style lang="scss">
.form-group {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 6px #312c1e0f, 0px 1px 14px #0000000a;
  border: 0.5px solid #0e1815;
  border-radius: 10px;
  opacity: 1;
}

.icons-contact {
  display: flex;
  justify-content: center;
  text-align: center;
  .icon h6 {
    font-weight: bold;
  }
  .icon img {
    width: 55px;
  }
  .icon-info {
    color: var(--co-secondary-text);
   // font: normal normal normal 24px/29px Gotham Rounded;
  }
}
#contact-send .modal-header {
  border-bottom: unset !important;
}
.contact-send-modal {
  .message {
    white-space: nowrap;
  }
  .send-msg {
    color: var(--co-secondary-text);
  }
  .modal-success {
    padding-top: 0px !important ;
  }
}

.center-modal {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.send-btn{
  .btn{
    padding: 10px;

  }
}

</style>