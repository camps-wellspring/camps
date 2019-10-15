<template>
  <GmapMap
    :center="center"
    :zoom="mapzoom"
    map-type-id="terrain"
    style="width: 100%; height: 11.75rem"
    @click="createMarker"
  >
    <GmapMarker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
      @drag="createMarker"
    />
  </GmapMap>
</template>

<script>
export default {
  props: {
    currentMarkers: {
      type: Array,
      default: () => []
    },
    zoomValue: {
      type: Number
    }
  },
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,
      center: {
        lat: 26.8206,
        lng: 30.8025
      },
      zoom: 5
    };
  },
  watch: {
    currentMarkers: {
      immediate: true,
      handler(newMarker) {
        if (newMarker !== null) {
          this.addMarker(newMarker);
        }
      }
    }
  },

  methods: {
    createMarker(e) {
      this.markers = [
        {
          position: {
            lat: parseFloat(e.latLng.lat()),
            lng: parseFloat(e.latLng.lng())
          }
        }
      ];
      this.$emit("markerUpdated", {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng())
      });
    },
    addMarker(markers) {
      if (!markers) {
        return;
      }

      this.markers = markers.map(elm => {
        return {
          position: {
            lat: parseFloat(elm.lat),
            lng: parseFloat(elm.lng)
          }
        };
      });
    },
    onlyCenter() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.markers.push({
          position: {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude)
          }
        });
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  computed: {
    mapzoom() {
      if (!this.zoomValue) {
        return this.zoom;
      } else {
        return this.zoomValue;
      }
    }
  }
};
</script>

<style></style>
