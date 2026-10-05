// ============================================================================
//  PLACEHOLDER, NOT REAL DATA.
//  There is no backend for the profile yet, so getProfile() just hands back the
//  sample profile from profileData.js (after a short pretend wait).
//
//  The person who builds the API replaces the BODY of getProfile() with a fetch()
//  and returns an object shaped like sampleProfile. Nothing else has to change.
//  If the request fails, `throw new Error("...")` and the page shows a message.
// ============================================================================

import { sampleProfile } from "./profileData";

export function getProfile() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(sampleProfile);
    }, 300);
  });
}
