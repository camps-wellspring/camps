<template>
  <v-col cols="12" md="6">
    <form-group name="video" :validator="$v.form.video">
      <template slot-scope="{ attrs }">
        <div class="input_wrpper">
          <v-row>
            <v-col md="10">
              <v-text-field
                :label="$t('label.video_url')"
                outlined
                v-model="form.video"
                v-bind="attrs"
                @input="$v.form.video.$touch()"
              ></v-text-field>
            </v-col>
            <v-col md="2">
              <v-btn
                @click="addVedios"
                v-show="form.video !== ''"
                large
                color="primary"
                :disabled="$v.form.video.$invalid"
                >{{ $t("button.add") }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
              v-for="(video, index) in form.videos"
              :key="index"
              class="video_pointer mb-2"
            >
              <div v-if="form.videos.length > 0">
                <iframe
                  class="ml-2"
                  width="100%"
                  height="200"
                  :src="convertVideo(video)"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <v-icon
                  @click="deleteVideo(video, index)"
                  class="close_icon"
                  medium
                  color="#fff"
                  >mdi-close
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
    </form-group>
  </v-col>
</template>

<script>
import { deleteMedia } from "@/api/media";
import { url } from "vuelidate/lib/validators";
export default {
  name: "VideoUpload",
  props: {
    videosFiles: {
      type: Array,
      default: () => []
    },
    updatedVideos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        videos: [],
        video: "",
        newVideos: []
      }
    };
  },
  methods: {
    addVedios() {
      //   this.updatedData.vedios.push(this.form.vedio);
      if (this.form.vedio !== "") {
        if (this.form.videos.includes(this.form.video)) {
          return;
        }
        this.form.videos.push(this.form.video);
        this.form.newVideos.push(this.form.video);
        this.form.video = "";
        this.$v.form.$reset();
        if (!this.updatedVideos) {
          this.$emit("set_videos", this.form.videos);
        } else {
          this.$emit("set_videos", this.form.newVideos);
        }
      }
    },
    convertVideo(video) {
      let url;
      let key;
      var regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
      key = video.match(regex)[1];
      url = video.substring(0, 24) + "embed/" + key;
      return url;
    },
    deleteVideo(video, index) {
      if (this.videosFiles[index]) {
        if (this.videosFiles[index].path === video) {
          // there is video id
          const { id } = this.videosFiles[index];
          this.popUp().then(value => {
            if (!value.dismiss) {
              deleteMedia(id).then(() => {
                this.form.videos.splice(index, 1);
              });
            }
          });
        }
      } else {
        this.form.videos.splice(index, 1);
      }
    }
  },
  validations() {
    return {
      form: {
        video: {
          url
        }
      }
    };
  },
  watch: {
    updatedVideos: {
      handler(updatedVideos) {
        if (updatedVideos) {
          updatedVideos.map(el => {
            if (el.path) {
              if (this.form.videos.includes(el.path)) {
                return;
              }
              this.form.videos.push(el.path);
            }
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
